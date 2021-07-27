/** @jsx withSlots */
import React, { useRef, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { Button } from '@fluentui-react-native/button';
import { ContextualMenu, ContextualMenuItem, SubmenuItem, Submenu } from '@fluentui-react-native/contextual-menu';
import { IUseComposeStyling, compose } from '@uifabricshared/foundation-compose';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { ISlots, withSlots } from '@uifabricshared/foundation-composable';
import { backgroundColorTokens, borderTokens } from '@fluentui-react-native/tokens';

import { ensureNativeComponent } from '@fluentui-react-native/component-cache';

const NativeMenuButton = ensureNativeComponent('MSFMenuButton');

const slotsWin32 = {
  root: React.Fragment,
  button: { slotType: Button as React.ComponentType<object> },
  contextualMenu: { slotType: ContextualMenu as React.ComponentType<object> },
  contextualMenuItems: React.Fragment,
};

const slotsMacOS = {
  nativeComponent: NativeMenuButton,
};

import {
  MenuButtonName,
  MenuButtonProps,
  MenuButtonSlotProps,
  MenuButtonType,
  MenuButtonRenderData,
  MenuButtonState,
} from './MenuButton.types';

export const MenuButton = compose<MenuButtonType>({
  displayName: MenuButtonName,
  usePrepareProps: (userProps: MenuButtonProps, useStyling: IUseComposeStyling<MenuButtonType>) => {
    const { menuItems, content, icon, disabled, onItemClick, contextualMenu } = userProps;

    const stdBtnRef = useRef(null);
    const [showContextualMenu, setShowContextualMenu] = useState(false);

    const onDismiss = useCallback(() => {
      setShowContextualMenu(false);
    }, [setShowContextualMenu]);

    const toggleShowContextualMenu = useCallback(() => {
      setShowContextualMenu(!showContextualMenu);
    }, [showContextualMenu, setShowContextualMenu]);

    const menuItemsUpdated = menuItems.map((item) => {
      if (item.hasSubmenu) {
        const [showSubmenu, setShowSubmenu] = useState(false);

        const toggleShowSubmenu = React.useCallback(() => {
          setShowSubmenu(!showSubmenu);
        }, [showSubmenu, setShowSubmenu]);

        const onDismissSubmenu = React.useCallback(() => {
          setShowSubmenu(false);
        }, [setShowSubmenu]);
        const { onHoverIn = toggleShowSubmenu, submenuProps = {}, ...restItems } = item;
        const { onDismiss = onDismissSubmenu, setShowMenu = toggleShowSubmenu, ...restSubmenuProps } = submenuProps;
        const menuItemUpdated = {
          ...restItems,
          onHoverIn,
          showSubmenu: item.showSubmenu ?? showSubmenu,
          submenuProps: { ...restSubmenuProps, onDismiss, setShowMenu },
        };
        return menuItemUpdated;
      }
      return item;
    });

    const state: MenuButtonState = {
      context: {
        showContextualMenu: !!showContextualMenu,
      },
    };

    const styleProps = useStyling(userProps, (override: string) => state[override] || userProps[override]);

    const slotProps = mergeSettings<MenuButtonSlotProps>(styleProps, {
      nativeComponent: {
        style: {
          width: 200,
          height: 100,
        },
      },
      root: {},
      button: {
        content,
        disabled,
        icon,
        componentRef: stdBtnRef,
        onClick: toggleShowContextualMenu,
      },
      contextualMenu: {
        onItemClick,
        target: stdBtnRef,
        onDismiss,
        setShowMenu: toggleShowContextualMenu,
        ...contextualMenu,
      },
      contextualMenuItems: {
        menuItems: menuItemsUpdated,
      },
    });

    return { slotProps, state };
  },
  slots: slotsMacOS,
  styles: {
    contextualMenu: [backgroundColorTokens, borderTokens],
    button: [backgroundColorTokens, borderTokens],
  },
  render: (Slots: ISlots<MenuButtonSlotProps>, renderData: MenuButtonRenderData) => {
    if (!(renderData.state && renderData.slotProps)) {
      return null;
    }
    const menuItems = renderData.slotProps!.contextualMenuItems?.menuItems || [];

    const onPress = (event: any) => {
      if (renderData.slotProps!.contextualMenu.onItemClick != null) {
        renderData.slotProps!.contextualMenu.onItemClick(event.nativeEvent.key);
      }
    };
    return (
      <Slots.nativeComponent
        onPress={onPress}
        menuItems={menuItems}
        content={renderData.slotProps!.button.content}
        disabled={renderData.slotProps!.button.disabled}
        imageSource={{
          uri:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    );
  },
});

export default MenuButton;
