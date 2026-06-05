import type { IViewProps } from '@fluentui-react-native/adapters';
import type { ColorValue } from 'react-native';

export interface LiquidGlassViewProps extends IViewProps {
  /** Corner radius of the glass effect (macOS 26+). */
  cornerRadius?: number;
  /** Optional tint applied to the glass material (macOS 26+). */
  tintColor?: ColorValue;
}
