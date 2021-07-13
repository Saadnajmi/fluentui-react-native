import { ContextualMenuItemProps, ContextualMenuItemSlotProps, ContextualMenuItemTokens } from './ContextualMenuItem.types';
import { UseStylingOptions } from '@fluentui-react-native/framework';

export const stylingSettings: UseStylingOptions<ContextualMenuItemProps, ContextualMenuItemSlotProps, ContextualMenuItemTokens> = {
  // tokens: {
  //   backgroundColor: 'menuBackground',
  //   color: 'menuItemText',
  //   borderColor: 'transparent',
  //   borderWidth: 1,
  // },
  slotProps: {
    root: {
      accessible: true,
      accessibilityRole: 'menuitem',
      focusable: true,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '100%',
      },
    },
    content: {},
    icon: { style: { marginEnd: 5 } },
    stack: {
      style: {
        display: 'flex',
        paddingStart: 7,
        paddingEnd: 7,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        minHeight: 32,
        minWidth: 80,
        justifyContent: 'flex-start',
      },
    },
  },
};
