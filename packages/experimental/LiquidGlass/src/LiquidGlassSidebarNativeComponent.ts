import type { HostComponent, ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

import type { SidebarMenuItem } from './LiquidGlassSidebar.types';

export interface NativeSidebarProps extends ViewProps {
  /** Menu items rendered as native NSTableView source-list rows. */
  items?: SidebarMenuItem[];
  /** Key of the selected item. */
  selectedKey?: string;
  /** Initial width of the sidebar pane, in points. */
  sidebarWidth?: number;
  /** Fired (as a direct event) when a row is selected natively. */
  onSelectItem?: (event: { nativeEvent: { key: string } }) => void;
}

// RN derives the component name from the view manager (FRNLiquidGlassSidebarViewManager)
// minus the "Manager" suffix → "FRNLiquidGlassSidebarView".
export default requireNativeComponent('FRNLiquidGlassSidebarView') as HostComponent<NativeSidebarProps>;
