import AppKit
import Foundation
#if USE_REACT_AS_MODULE
  import React
#endif  // USE_REACT_AS_MODULE

@objc(FRNLiquidGlassSidebarViewManager)
class LiquidGlassSidebarViewManager: RCTViewManager {

  override func view() -> NSView! {
    return LiquidGlassSidebar()
  }

  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}
