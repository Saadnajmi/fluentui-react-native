import AppKit
import Foundation
#if USE_REACT_AS_MODULE
  import React
#endif  // USE_REACT_AS_MODULE

@objc(FRNLiquidGlassViewManager)
class LiquidGlassViewManager: RCTViewManager {

  override func view() -> NSView! {
    return LiquidGlassView()
  }

  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}
