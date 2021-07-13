import * as React from 'react';
import { ViewProps } from 'react-native';
import { ITextProps } from '@fluentui-react-native/text';
import { ContextualMenuItemProps, ContextualMenuItemTokens, ContextualMenuItemState } from './ContextualMenuItem.types';
import { IconProps } from '@fluentui-react-native/icon';

export const submenuItemName = 'submenuItem';
export type SubmenuItemTokens = ContextualMenuItemTokens;
export type SubmenuItemProps = ContextualMenuItemProps;
export type SubmenuItemState = ContextualMenuItemState;

export interface SubmenuItemSlotProps {
  root: React.PropsWithRef<ViewProps>;
  leftstack: ViewProps;
  icon: IconProps;
  content: ITextProps;
  rightstack: ViewProps;
  chevron: IconProps;
}

export interface SubmenuItemType {
  props: SubmenuItemProps;
  tokens: SubmenuItemTokens;
  slotProps: SubmenuItemSlotProps;
  state: SubmenuItemState;
}
