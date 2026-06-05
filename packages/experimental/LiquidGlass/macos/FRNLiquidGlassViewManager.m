#import <React/RCTComponent.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(FRNLiquidGlassViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(tintColor, NSColor)

@end
