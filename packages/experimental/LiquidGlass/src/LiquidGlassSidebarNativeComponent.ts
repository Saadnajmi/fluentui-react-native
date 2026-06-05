import type { ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

export interface NativeSidebarProps extends ViewProps {
  /** Initial width of the sidebar pane, in points. */
  sidebarWidth?: number;
}

// RN derives the component name from the view manager (FRNLiquidGlassSidebarViewManager)
// minus the "Manager" suffix → "FRNLiquidGlassSidebarView".
export default requireNativeComponent<NativeSidebarProps>('FRNLiquidGlassSidebarView');
