import type { ColorValue, ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  /** Corner radius of the glass effect (macOS 26+). */
  cornerRadius?: number;
  /** Optional tint applied to the glass material (macOS 26+). */
  tintColor?: ColorValue;
}

export default requireNativeComponent<NativeProps>('FRNLiquidGlassView');
