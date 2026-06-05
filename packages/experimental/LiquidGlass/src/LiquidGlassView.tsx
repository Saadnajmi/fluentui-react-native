import type { LiquidGlassViewProps } from './LiquidGlassView.types';
import NativeLiquidGlassView from './LiquidGlassViewNativeComponent';

/**
 * A native macOS "Liquid Glass" surface (`NSGlassEffectView`, macOS 26+). Children render
 * inside the glass. On earlier macOS it falls back to a sidebar vibrancy effect.
 */
export const LiquidGlassView = (props: LiquidGlassViewProps) => {
  return <NativeLiquidGlassView {...props} />;
};

export default LiquidGlassView;
