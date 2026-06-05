import type { LiquidGlassSidebarProps } from './LiquidGlassSidebar.types';
import NativeLiquidGlassSidebar from './LiquidGlassSidebarNativeComponent';

/**
 * A native macOS split view with a Liquid Glass sidebar (`NSSplitViewController` + a
 * `.sidebar` item, macOS 26). Exactly two children are expected:
 *   - child 0 renders inside the glass sidebar pane,
 *   - child 1 renders in the content pane (its background extends under the floating sidebar
 *     via `NSBackgroundExtensionView`).
 *
 * On macOS < 26 the sidebar falls back to a vibrant sidebar and the background extension is
 * skipped.
 */
export const LiquidGlassSidebar = (props: LiquidGlassSidebarProps) => {
  return <NativeLiquidGlassSidebar {...props} />;
};

export default LiquidGlassSidebar;
