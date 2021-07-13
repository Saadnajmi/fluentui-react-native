/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import { compose, withSlots, UseSlots } from '@fluentui-react-native/framework';
import { stylingSettings } from './SubmenuItem.styling';
import { Icon } from '@fluentui-react-native/Icon';
import { Text } from '@fluentui-react-native/experimental-text';
import { submenuItemName, SubmenuItemProps, SubmenuItemType } from './SubmenuItem.types';

export const SubmenuItem = compose<SubmenuItemType>({
  displayName: submenuItemName,
  ...stylingSettings,
  slots: {
    root: View,
    leftstack: View,
    icon: Icon,
    content: Text,
    rightstack: View,
    chevron: Icon,
  },
  render: (props: SubmenuItemProps, useSlots: UseSlots<SubmenuItemType>) => {
    const Slots = useSlots(props);
    return (rest: SubmenuItemProps, ...children: React.ReactNode[]) => {
      return (
        <Slots.root {...rest}>
          <Slots.leftstack>
            <Slots.icon />
            <Slots.content />
            {children}
          </Slots.leftstack>
          <Slots.rightstack>
            <Slots.chevron />
          </Slots.rightstack>
        </Slots.root>
      );
    };
  },
});
