import { ContextualMenuItemProps, ContextualMenuProps, SubmenuProps } from '@fluentui-react-native/contextual-menu';
import { FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens } from '@fluentui-react-native/tokens';
import { IButtonProps } from '@fluentui-react-native/button';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { ImageURISource } from 'react-native';

export const MenuButtonName = 'MenuButton';

export interface MenuButtonContext {
  showContextualMenu?: boolean;
}

export interface MenuButtonState {
  context: MenuButtonContext;
}

export interface MenuButtonTokens extends FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens {}

export interface MenuButtonItemProps extends ContextualMenuItemProps {
  hasSubmenu?: boolean;
  submenuItems?: ContextualMenuItemProps[];
  submenuProps?: SubmenuProps;
  showSubmenu?: boolean;
}

export interface MenuButtonProps extends IButtonProps {
  menuItems?: MenuButtonItemProps[];
  onItemClick?: (key: string) => void;
  contextualMenu?: ContextualMenuProps;
}

export type MenuButtonSlotProps = {
  root: MenuButtonProps;
  button: IButtonProps & MenuButtonTokens;
  contextualMenu: React.PropsWithRef<ContextualMenuProps>;
  contextualMenuItems: Pick<MenuButtonProps, 'menuItems'>;
  contextualMenuItem: MenuButtonItemProps;
};

export type NativeComponentProps = {
  imageSource?: ImageURISource;
  onPress?: (key: string) => void;
};

export type MenuButtonSlotPropsMacOS = {
  root: MenuButtonProps & NativeComponentProps; // Slot that represents the native component on macOS, rather than using the other slots.
  contextualMenu: React.PropsWithRef<ContextualMenuProps>;
  contextualMenuItems: Pick<MenuButtonProps, 'menuItems'>;
  contextualMenuItem: MenuButtonItemProps;
};

export type MenuButtonRenderData = IRenderData<MenuButtonSlotProps, MenuButtonState>;

export interface MenuButtonType {
  props: MenuButtonProps;
  slotProps: MenuButtonSlotProps;
  state: MenuButtonState;
  tokens: MenuButtonTokens;
}

export interface MenuButtonTypeMacOS {
  props: MenuButtonProps;
  slotProps: MenuButtonSlotPropsMacOS;
  state: MenuButtonState;
  tokens: MenuButtonTokens;
}
