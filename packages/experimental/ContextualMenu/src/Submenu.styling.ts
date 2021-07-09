import { UseStylingOptions } from '@fluentui-react-native/framework';
import { submenuName, SubmenuProps, SubmenuSlotProps, SubmenuTokens } from './Submenu.types';

export const stylingSettings: UseStylingOptions<SubmenuProps, SubmenuSlotProps, SubmenuTokens> = {
  tokens: [() => ({}), submenuName],
  slotProps: {
    root: {
      accessibilityRole: 'menu',
      directionalHint: 'rightTopEdge',
    },
    container: {
      style: {
        padding: 1,
      },
    },
  },
};
