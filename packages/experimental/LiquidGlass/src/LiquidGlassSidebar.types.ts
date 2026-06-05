import type { IViewProps } from '@fluentui-react-native/adapters';

export interface LiquidGlassSidebarProps extends IViewProps {
  /**
   * Initial width of the sidebar pane, in points (default 280). The sidebar is a native
   * `NSSplitViewItem` so it can be resized/collapsed by the user.
   */
  sidebarWidth?: number;
}
