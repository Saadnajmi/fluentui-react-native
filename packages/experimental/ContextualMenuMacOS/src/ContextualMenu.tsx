/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import {
  contextualMenuName,
  ContextualMenuProps,
  // ContextualMenuSlotProps,
  ContextualMenuType,
  // ContextualMenuRenderData,
  ContextualMenuContext,
  // ContextualMenuState,
} from './ContextualMenu.types';
// import { settings } from './ContextualMenu.settings';
import { compose, withSlots, UseSlots, buildUseStyling, mergeProps } from '@fluentui-react-native/framework';
// import { useSelectedKey } from '@fluentui-react-native/interactive-hooks';
// import { backgroundColorTokens, borderTokens } from '@fluentui-react-native/tokens';
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
  tokens: [],
  tokensThatAreAlsoProps: [],
  slots: {
    root: Callout,
    container: View,
  },
  slotProps: {
    root: {},
    container: {},
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
