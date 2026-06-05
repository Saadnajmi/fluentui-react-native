#import <React/RCTComponent.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(FRNLiquidGlassSidebarViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(items, NSArray)

RCT_EXPORT_VIEW_PROPERTY(selectedKey, NSString)

RCT_EXPORT_VIEW_PROPERTY(sidebarWidth, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(onSelectItem, RCTDirectEventBlock)

@end
