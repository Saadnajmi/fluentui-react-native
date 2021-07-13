import { UseStylingOptions } from '@fluentui-react-native/framework';
import { submenuItemName, SubmenuItemProps, SubmenuItemSlotProps, SubmenuItemTokens } from './SubmenuItem.types';

export const stylingSettings: UseStylingOptions<SubmenuItemProps, SubmenuItemSlotProps, SubmenuItemTokens> = {
  tokens: [() => ({}), submenuItemName],
  slotProps: {
    root: {
      accessible: true,
      accessibilityRole: 'menuitem',
      focusable: true,
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
      },
    },
    content: {},
    icon: { style: { marginEnd: 5 } },
    leftstack: {
      style: {
        display: 'flex',
        paddingStart: 5,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        minHeight: 32,
        justifyContent: 'flex-start',
      },
    },
    rightstack: {
      style: {
        display: 'flex',
        paddingEnd: 5,
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 32,
        width: 12,
        justifyContent: 'flex-end',
      },
    },
  },
};
