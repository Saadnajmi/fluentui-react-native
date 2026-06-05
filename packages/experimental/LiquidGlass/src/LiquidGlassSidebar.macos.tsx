import type { LiquidGlassSidebarProps } from './LiquidGlassSidebar.types';
import NativeLiquidGlassSidebar from './LiquidGlassSidebarNativeComponent';

/**
 * macOS implementation of `LiquidGlassSidebar`: the declarative `items` drive a native
 * `NSTableView` source-list sidebar inside an `NSSplitViewController` (Liquid Glass on macOS
 * 26), and `children` fill the content pane. Native selection reports back via `onSelectItem`.
 *
 * `sidebarHeader`/`sidebarFooter` are not yet rendered natively (the menu is fully native);
 * the JS fallback (`LiquidGlassSidebar.tsx`) honors them.
 */
export const LiquidGlassSidebar = (props: LiquidGlassSidebarProps) => {
  const { items, selectedKey, onSelectItem, sidebarWidth, children, sidebarHeader, sidebarFooter, ...rest } = props;

  return (
    <NativeLiquidGlassSidebar
      items={items}
      selectedKey={selectedKey}
      sidebarWidth={sidebarWidth}
      onSelectItem={(e) => onSelectItem?.(e.nativeEvent.key)}
      {...rest}
    >
      {children}
    </NativeLiquidGlassSidebar>
  );
};

export default LiquidGlassSidebar;
