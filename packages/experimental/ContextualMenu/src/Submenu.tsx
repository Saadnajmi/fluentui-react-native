/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import { submenuName, SubmenuProps, SubmenuType } from './Submenu.types';
import { compose, withSlots, UseSlots, mergeProps } from '@fluentui-react-native/framework';
import { stylingSettings } from './Submenu.styling';
import { Callout } from '@fluentui-react-native/callout';

export const Submenu = compose<SubmenuType>({
  displayName: submenuName,
  ...stylingSettings,
  slots: {
    root: Callout,
    container: View,
  },
  render: (props: SubmenuProps, useSlots: UseSlots<SubmenuType>) => {
    const Slots = useSlots(props)
    return (rest: SubmenuProps, ...children: React.ReactNode[]) => {
      return (
        <Slots.root>
          <Slots.container>{children}</Slots.container>
        </Slots.root>
      );
    }

  }

}
