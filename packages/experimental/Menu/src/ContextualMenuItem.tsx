/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import {
  // ContextualMenuItemSlotProps,
  // ContextualMenuItemState,
  ContextualMenuItemProps,
  contextualMenuItemName,
  ContextualMenuItemType,
} from './ContextualMenuItem.types';
import { Text } from '@fluentui-react-native/experimental-text';
// import { backgroundColorTokens, borderTokens, textTokens, foregroundColorTokens, getPaletteFromTheme } from '@fluentui-react-native/tokens';
// import { useAsPressable, useKeyCallback, useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';
// import { CMContext } from './ContextualMenu';
import { Icon } from '@fluentui-react-native/icon';
// import { createIconProps } from '@fluentui-react-native/interactive-hooks';
import { compose, withSlots, UseSlots, mergeProps } from '@fluentui-react-native/framework';
import { stylingSettings } from './ContextualMenuItem.styling';

export const ContextualMenuItem = compose<ContextualMenuItemType>({
  displayName: contextualMenuItemName,
  ...stylingSettings,
  slots: {
    root: View,
    stack: View,
    icon: Icon,
    content: Text,
  },
  render: (props: ContextualMenuItemProps, useSlots: UseSlots<ContextualMenuItemType>) => {
    const Slots = useSlots(props);
    return (rest: ContextualMenuItemProps, ...children: React.ReactNode[]) => {
      const { icon, text, ...mergedProps } = mergeProps(props, rest);
      return (
        <Slots.root {...mergedProps}>
          <Slots.stack>
            {icon && <Slots.icon />}
            {text && <Slots.content />}
            {children}
          </Slots.stack>
        </Slots.root>
      );
    };
  },
});
