import { UseStylingOptions } from '@fluentui-react-native/framework';
import { SubmenuProps, SubmenuSlotProps, SubmenuTokens } from './Submenu.types';

export const stylingSettings: UseStylingOptions<SubmenuProps, SubmenuSlotProps, SubmenuTokens> = {
  tokens: {
    backgroundColor: 'menuBackground',
    beakWidth: 20,
    borderColor: 'buttonBorder',
    borderWidth: 1,
    gapSpace: 0,
    minPadding: 0,
  },
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
