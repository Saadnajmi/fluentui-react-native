/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import { contextualMenuName, ContextualMenuProps, ContextualMenuType, ContextualMenuContext } from './ContextualMenu.types';
// import { settings } from './ContextualMenu.settings';
import { compose, withSlots, UseSlots, mergeProps } from '@fluentui-react-native/framework';
import { stylingSettings } from './ContextualMenu.styling';
import { Callout } from '@fluentui-react-native/callout';

export const CMContext = React.createContext<ContextualMenuContext>({
  selectedKey: null,
  onItemClick: (/* key: string */) => {
    return;
  },
  onDismissMenu: () => {
    return;
  },
});

export const ContextualMenu = compose<ContextualMenuType>({
  displayName: contextualMenuName,
  ...stylingSettings,
  slots: {
    root: Callout,
    container: View,
  },

  render: (props: ContextualMenuProps, useSlots: UseSlots<ContextualMenuType>) => {
    const Slots = useSlots(props);
    return (rest: ContextualMenuProps, children: React.ReactNode[]) => {
      return (
        <Slots.root {...mergeProps(props, rest)}>
          <Slots.container>{children}</Slots.container>
        </Slots.root>
      );
    };
  },
});

export default ContextualMenu;
