import AppKit
#if USE_REACT_AS_MODULE
  import React
#endif  // USE_REACT_AS_MODULE

/// React Native macOS uses a flipped coordinate space; hosting views must match so layout +
/// RCTTouchHandler line up.
internal class FRNSidebarFlippedView: NSView {
  override var isFlipped: Bool { return true }
}

/// A real native macOS split view with a Liquid Glass sidebar whose menu is **native**.
///
/// The declarative `items` prop drives a native `NSTableView` source list inside an
/// `NSSplitViewController` sidebar item (system Liquid Glass on macOS 26). Native selection is
/// reported back to JS via the `onSelectItem` direct event. React `children` fill the content
/// pane, which is wrapped in `NSBackgroundExtensionView` so its background extends under the
/// floating sidebar. On macOS < 26 the sidebar is a vibrant source list and the background
/// extension is skipped.
@objc(FRNLiquidGlassSidebar)
open class LiquidGlassSidebar: RCTView, NSTableViewDataSource, NSTableViewDelegate {

  private let splitController = NSSplitViewController()
  private let contentHost = FRNSidebarFlippedView()
  private let tableView = NSTableView()
  private let scrollView = NSScrollView()
  private var items: [[String: Any]] = []
  private var sidebarWidth: CGFloat = 280
  private var pendingSelectedKey: String?
  private var didInstall = false
  private var suppressSelectionEvent = false

  @objc public var onSelectItem: RCTDirectEventBlock?

  @objc public convenience init() {
    self.init(frame: .zero)
  }

  public override init(frame frameRect: NSRect) {
    super.init(frame: frameRect)
    setupSplit()
  }

  public required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  private func setupSplit() {
    // Native source-list table for the sidebar menu.
    let column = NSTableColumn(identifier: NSUserInterfaceItemIdentifier("FRNSidebarColumn"))
    column.resizingMask = .autoresizingMask
    tableView.addTableColumn(column)
    tableView.headerView = nil
    if #available(macOS 11.0, *) {
      tableView.style = .sourceList
    } else {
      tableView.selectionHighlightStyle = .sourceList
    }
    tableView.backgroundColor = .clear
    tableView.selectionHighlightStyle = .regular
    tableView.dataSource = self
    tableView.delegate = self
    tableView.allowsEmptySelection = true

    scrollView.documentView = tableView
    scrollView.hasVerticalScroller = true
    scrollView.drawsBackground = false
    scrollView.translatesAutoresizingMaskIntoConstraints = false

    let sidebarVC = NSViewController()
    let sidebarContainer = FRNSidebarFlippedView()
    sidebarContainer.addSubview(scrollView)
    NSLayoutConstraint.activate([
      scrollView.leadingAnchor.constraint(equalTo: sidebarContainer.leadingAnchor),
      scrollView.trailingAnchor.constraint(equalTo: sidebarContainer.trailingAnchor),
      scrollView.topAnchor.constraint(equalTo: sidebarContainer.topAnchor),
      scrollView.bottomAnchor.constraint(equalTo: sidebarContainer.bottomAnchor),
    ])
    sidebarVC.view = sidebarContainer
    let sidebarItem = NSSplitViewItem(sidebarWithViewController: sidebarVC)
    sidebarItem.canCollapse = true
    sidebarItem.minimumThickness = 180
    sidebarItem.maximumThickness = 420
    splitController.addSplitViewItem(sidebarItem)

    // Content pane, wrapped so its background extends under the floating sidebar.
    contentHost.autoresizingMask = [.width, .height]
    let contentVC = NSViewController()
    if #available(macOS 26.0, *) {
      let ext = NSBackgroundExtensionView()
      ext.autoresizingMask = [.width, .height]
      ext.contentView = contentHost
      contentVC.view = ext
    } else {
      contentVC.view = contentHost
    }
    splitController.addSplitViewItem(NSSplitViewItem(viewController: contentVC))

    let splitView = splitController.view
    splitView.autoresizingMask = [.width, .height]
    splitView.frame = bounds
    addSubview(splitView)
  }

  open override func viewDidMoveToWindow() {
    super.viewDidMoveToWindow()
    if window != nil, !didInstall {
      didInstall = true
      splitController.splitView.setPosition(sidebarWidth, ofDividerAt: 0)
    }
  }

  // React children fill the content pane (the menu is fully native).
  open override func insertReactSubview(_ subview: NSView!, at atIndex: Int) {
    contentHost.addSubview(subview)
    needsLayout = true
  }

  open override func removeReactSubview(_ subview: NSView!) {
    subview.removeFromSuperview()
  }

  open override func layout() {
    super.layout()
    splitController.view.frame = bounds
    for child in contentHost.subviews {
      child.frame = contentHost.bounds
    }
  }

  // MARK: - Props

  @objc public func setItems(_ items: NSArray) {
    self.items = (items as? [[String: Any]]) ?? []
    tableView.reloadData()
    applySelection()
  }

  @objc public func setSelectedKey(_ key: NSString?) {
    pendingSelectedKey = key as String?
    applySelection()
  }

  @objc public func setSidebarWidth(_ width: CGFloat) {
    sidebarWidth = width
    if didInstall {
      splitController.splitView.setPosition(width, ofDividerAt: 0)
    }
  }

  private func applySelection() {
    guard let key = pendingSelectedKey,
          let idx = items.firstIndex(where: { ($0["key"] as? String) == key })
    else { return }
    if tableView.selectedRow != idx {
      suppressSelectionEvent = true
      tableView.selectRowIndexes(IndexSet(integer: idx), byExtendingSelection: false)
      suppressSelectionEvent = false
    }
  }

  // MARK: - NSTableViewDataSource / Delegate

  public func numberOfRows(in tableView: NSTableView) -> Int {
    return items.count
  }

  public func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
    let identifier = NSUserInterfaceItemIdentifier("FRNSidebarCell")
    let cell: NSTableCellView
    if let reused = tableView.makeView(withIdentifier: identifier, owner: self) as? NSTableCellView {
      cell = reused
    } else {
      cell = NSTableCellView()
      cell.identifier = identifier
      let textField = NSTextField(labelWithString: "")
      textField.translatesAutoresizingMaskIntoConstraints = false
      textField.lineBreakMode = .byTruncatingTail
      cell.addSubview(textField)
      cell.textField = textField
      NSLayoutConstraint.activate([
        textField.leadingAnchor.constraint(equalTo: cell.leadingAnchor, constant: 4),
        textField.trailingAnchor.constraint(equalTo: cell.trailingAnchor, constant: -4),
        textField.centerYAnchor.constraint(equalTo: cell.centerYAnchor),
      ])
    }

    let item = items[row]
    let label = item["label"] as? String ?? ""
    if let icon = item["icon"] as? String, !icon.isEmpty {
      cell.textField?.stringValue = "\(icon)  \(label)"
    } else {
      cell.textField?.stringValue = label
    }
    return cell
  }

  public func tableViewSelectionDidChange(_ notification: Notification) {
    guard !suppressSelectionEvent else { return }
    let row = tableView.selectedRow
    guard row >= 0, row < items.count, let key = items[row]["key"] as? String else { return }
    onSelectItem?(["key": key])
  }
}
