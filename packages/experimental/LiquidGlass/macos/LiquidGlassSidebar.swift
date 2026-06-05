import AppKit
#if USE_REACT_AS_MODULE
  import React
#endif  // USE_REACT_AS_MODULE

/// React Native macOS uses a flipped coordinate space; hosting views must match so layout +
/// RCTTouchHandler line up.
internal class FRNSidebarFlippedView: NSView {
  override var isFlipped: Bool { return true }
}

/// A real native macOS split view with a Liquid Glass sidebar.
///
/// Built on `NSSplitViewController` so the sidebar item gets the system **Liquid Glass**
/// treatment on macOS 26 (floating, translucent) for free; the content item is wrapped in
/// `NSBackgroundExtensionView` so its background extends *under* the floating sidebar via the
/// safe area (the macOS 26 "background extension effect"). React content is hosted in each
/// pane: child 0 → sidebar, child 1 → content.
///
/// On macOS < 26 the sidebar item still renders as a vibrant sidebar and the background
/// extension is skipped, so the control degrades gracefully.
@objc(FRNLiquidGlassSidebar)
open class LiquidGlassSidebar: RCTView {

  private let splitController = NSSplitViewController()
  private let sidebarHost = FRNSidebarFlippedView()  // hosts React child 0
  private let contentHost = FRNSidebarFlippedView()   // hosts React child 1
  private var sidebarWidth: CGFloat = 280
  private var didInstall = false

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
    sidebarHost.autoresizingMask = [.width, .height]
    contentHost.autoresizingMask = [.width, .height]

    // Sidebar pane.
    let sidebarVC = NSViewController()
    sidebarVC.view = sidebarHost
    let sidebarItem = NSSplitViewItem(sidebarWithViewController: sidebarVC)
    sidebarItem.canCollapse = true
    sidebarItem.minimumThickness = 180
    sidebarItem.maximumThickness = 420
    splitController.addSplitViewItem(sidebarItem)

    // Content pane, wrapped so its background extends under the floating sidebar.
    let contentVC = NSViewController()
    if #available(macOS 26.0, *) {
      let ext = NSBackgroundExtensionView()
      ext.autoresizingMask = [.width, .height]
      ext.contentView = contentHost
      contentVC.view = ext
    } else {
      contentVC.view = contentHost
    }
    let contentItem = NSSplitViewItem(viewController: contentVC)
    splitController.addSplitViewItem(contentItem)

    let splitView = splitController.view
    splitView.autoresizingMask = [.width, .height]
    splitView.frame = bounds
    addSubview(splitView)
  }

  open override func viewDidMoveToWindow() {
    super.viewDidMoveToWindow()
    // Place the divider once we have a window/size, then keep the sidebar at its width.
    if window != nil, !didInstall {
      didInstall = true
      splitController.splitView.setPosition(sidebarWidth, ofDividerAt: 0)
    }
  }

  open override func insertReactSubview(_ subview: NSView!, at atIndex: Int) {
    if atIndex == 0 {
      sidebarHost.addSubview(subview)
    } else {
      contentHost.addSubview(subview)
    }
    needsLayout = true
  }

  open override func removeReactSubview(_ subview: NSView!) {
    subview.removeFromSuperview()
  }

  @objc public func setSidebarWidth(_ width: CGFloat) {
    sidebarWidth = width
    if didInstall {
      splitController.splitView.setPosition(width, ofDividerAt: 0)
    }
  }

  /// Yoga lays React children out relative to this whole view; the split positions the panes.
  /// Pin each child to fill its pane so the two layout systems agree.
  open override func layout() {
    super.layout()
    splitController.view.frame = bounds
    for child in sidebarHost.subviews {
      child.frame = sidebarHost.bounds
    }
    for child in contentHost.subviews {
      child.frame = contentHost.bounds
    }
  }
}
