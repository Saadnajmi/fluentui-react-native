import { ViewProps } from 'react-native';
import ContextualMenu from './ContextualMenu';

export const contextualMenuName = 'ContextualMenu';

export interface ContextualMenuContext {
  /*
   ** The currently selected ContextualMenu's key
   */
  selectedKey: string | null;

  /*
   ** Updates the clicked menu item and calls the client’s onItemClick callback
   */
  onItemClick?: (key: string) => void;
  /*
   ** Parent menu's onDismiss callback that is passed into submenu to call when submenu item is clicked
   */
  onDismissMenu?: () => void;
  /*
   ** Checks if any child menus are open
   */
  isSubmenuOpen?: boolean;
  /*
   ** ContextualMenuItems will call this submenu dismissal when they are hovered
   */
  dismissSubmenu?: () => void;
}

export interface ContextualMenuState {
  context: ContextualMenuContext;
}

/**
 * Properties and Tokens for FluentUI React Native ContextualMenu
 */
export interface ContextualMenuProps {
  /*
   ** Callback for when menu item is clicked
   */
  onItemClick?: (key: string) => void;
  /*
   ** Callback to toggle showContextualMenu to false and close menu on item click
   */
  setShowMenu?: (showMenu: boolean) => void;
}

export interface ContextualMenuTokens extends ContextualMenuProps {}

export type ContextualMenuSlotProps = {
  root: ContextualMenuProps;
  container: ViewProps;
};

export interface ContextualMenuType {
  props: ContextualMenuProps;
  slotProps: ContextualMenuSlotProps;
  tokens: ContextualMenuTokens;
  state: ContextualMenuState;
}
