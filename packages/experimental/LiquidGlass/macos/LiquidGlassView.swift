import AppKit
#if USE_REACT_AS_MODULE
  import React
#endif  // USE_REACT_AS_MODULE

/// React Native macOS uses a flipped coordinate space by default (to match the other
/// platforms). Hosting views must also be flipped so RCTTouchHandler and layout line up.
internal class FlippedContentView: NSView {
  override var isFlipped: Bool { return true }
}

internal class FlippedVisualEffectView: NSVisualEffectView {
  override var isFlipped: Bool { return true }
}

/// A native wrapper around macOS 26 "Liquid Glass" (`NSGlassEffectView`). React children are
/// rendered inside the glass effect's `contentView`. On macOS < 26 it falls back to a
/// `NSVisualEffectView` (sidebar vibrancy) so the control degrades gracefully.
@objc(FRNLiquidGlassView)
open class LiquidGlassView: RCTView {

  @objc public convenience init() {
    self.init(frame: .zero)
  }

  public override init(frame frameRect: NSRect) {
    super.init(frame: frameRect)
    clipsToBounds = true

    let host = FlippedContentView()
    host.autoresizingMask = [.width, .height]
    contentHost = host

    if #available(macOS 26.0, *) {
      let glass = NSGlassEffectView()
      glass.autoresizingMask = [.width, .height]
      glass.contentView = host
      addSubview(glass)
      glassView = glass
    } else {
      let fallback = FlippedVisualEffectView()
      fallback.autoresizingMask = [.width, .height]
      fallback.material = .sidebar
      fallback.blendingMode = .behindWindow
      fallback.state = .followsWindowActiveState
      fallback.addSubview(host)
      addSubview(fallback)
    }
  }

  public required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  open override func insertReactSubview(_ subview: NSView!, at atIndex: Int) {
    contentHost?.addSubview(subview)
  }

  /// `NSGlassEffectView` hosts its `contentView` for *display* but does not forward hit-testing
  /// into it, so React children (Pressables, Buttons) never receive clicks. Route hits into the
  /// content host explicitly: probe the React subtree top-down, falling back to the default.
  /// `point` arrives in the receiver's superview coordinate space (NSView.hitTest convention).
  open override func hitTest(_ point: NSPoint) -> NSView? {
    if let host = contentHost, let parent = superview {
      let pointInHost = host.convert(point, from: parent)
      for subview in host.subviews.reversed() {
        if let hit = subview.hitTest(pointInHost) {
          return hit
        }
      }
    }
    return super.hitTest(point)
  }

  @objc public func setCornerRadius(_ radius: CGFloat) {
    if #available(macOS 26.0, *) {
      (glassView as? NSGlassEffectView)?.cornerRadius = radius
    }
  }

  @objc public func setTintColor(_ color: NSColor?) {
    if #available(macOS 26.0, *) {
      (glassView as? NSGlassEffectView)?.tintColor = color
    }
  }

  private var glassView: NSView?
  private var contentHost: NSView?
}
