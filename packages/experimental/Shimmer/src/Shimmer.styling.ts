import { UseStylingOptions, buildProps, Theme } from '@fluentui-react-native/framework';
import { getCurrentAppearance } from '@fluentui-react-native/theming-utils';
import { shimmerName, ShimmerProps, ShimmerSlotProps, ShimmerTokens } from './Shimmer.types';

export const stylingSettings: UseStylingOptions<ShimmerProps, ShimmerSlotProps, ShimmerTokens> = {
  tokens: [
    () => ({
      angle: 0,
      delay: 0,
      duration: 7000,
      shimmerColor: '#E1E1E1', // Baseline component is the light mode color
      shimmerColorOpacity: 1,
      shimmerWaveColor: 'white', // Baseline component is the light mode color
      shimmerWaveColorOpacity: 1,
    }),
    shimmerName,
  ],
  slotProps: {
    root: buildProps(
      (tokens: ShimmerTokens, theme: Theme) => ({
        accessibilityRole: 'progressbar',
        accessible: true,
        angle: tokens.angle,
        delay: tokens.delay,
        duration: tokens.duration,
        shimmerColor: getCurrentAppearance(theme.host.appearance, 'light') === 'light' ? '#E1E1E1' : '#404040',
        shimmerColorOpacity: tokens.shimmerColorOpacity,
        shimmerWaveColor: getCurrentAppearance(theme.host.appearance, 'light') === 'light' ? 'white' : 'black',
        shimmerWaveColorOpacity: tokens.shimmerWaveColorOpacity,
      }),
      ['angle', 'delay', 'duration', 'shimmerColor', 'shimmerColorOpacity', 'shimmerWaveColor', 'shimmerWaveColorOpacity'],
    ),
  },
};

// export function getShimmerStylingSettings(): UseStylingOptions<ShimmerProps, ShimmerSlotProps, ShimmerTokens> {
//   const currentAppearance = getCurrentAppearance(t.host?.appearance, 'light');
//   return {
//     tokens: [
//       (t) => ({
//         toValue: 30,
//         duration: 7000,
//         delay: 0,
//         gradientTintColor: currentAppearance === 'light' ? 'white' : 'black',
//         shimmerTintColor: currentAppearance === 'light' ? '#E1E1E1' : '#404040',
//         width: 200,
//         height: 100,
//         angle: 0,
//         gradientOpacity: 0.7,
//       }),
//       shimmerName,
//     ],
//     slotProps: {
//       root: buildProps(
//         (tokens: ShimmerTokens) => ({
//           gradientTintColor: tokens.gradientTintColor,
//           toValue: tokens.toValue,
//           duration: tokens.duration,
//           delay: tokens.delay,
//           shimmerTintColor: tokens.shimmerTintColor,
//           width: tokens.width,
//           height: tokens.height,
//           angle: tokens.angle,
//           gradientOpacity: tokens.gradientOpacity,
//           accessibilityRole: 'progressbar',
//           accessible: true,
//         }),
//         ['gradientTintColor', 'toValue', 'duration', 'delay', 'shimmerTintColor', 'width', 'height', 'angle', 'gradientOpacity'],
//       ),
//       image: buildProps((_tokens: ShimmerTokens) => ({
//         href: null,
//       })),
//     },
//   };
// }
