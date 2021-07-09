import { ContextualMenuProps, ContextualMenuTokens, ContextualMenuState } from './ContextualMenu.types';
import { ViewProps } from 'react-native';

export const submenuName = 'Submenu';

export type SubmenuState = ContextualMenuState;
export type SubmenuTokens = ContextualMenuTokens;
export type SubmenuProps = ContextualMenuProps;

export type SubmenuSlotProps = {
  root: SubmenuProps;
  container: ViewProps;
};

export interface SubmenuType {
  props: SubmenuProps;
  slotProps: SubmenuSlotProps;
  tokens: SubmenuTokens;
  state: SubmenuState;
}
