import type * as React from 'react';

import type { IViewProps } from '@fluentui-react-native/adapters';

export interface SidebarMenuItem {
  /** Stable identifier reported back via `onSelectItem`. */
  key: string;
  /** Row label. */
  label: string;
  /**
   * Optional icon. On macOS this is treated as an SF Symbol name (falls back to showing the
   * string as text if it isn't a valid symbol); the JS fallback renders it as text/emoji.
   */
  icon?: string;
  /** Optional badge count shown at the trailing edge. */
  badge?: number;
}

export interface LiquidGlassSidebarProps extends IViewProps {
  /**
   * Declarative sidebar menu items. On macOS these render as native `NSTableView` source-list
   * rows (Liquid Glass on macOS 26); on other platforms the JS fallback renders pressable rows.
   */
  items?: SidebarMenuItem[];
  /** Key of the selected item. */
  selectedKey?: string;
  /** Fired when a menu item is chosen (native selection on macOS, press in the JS fallback). */
  onSelectItem?: (key: string) => void;
  /**
   * Initial width of the sidebar pane, in points (default 280). On macOS it is a native
   * `NSSplitViewItem` so it can be resized/collapsed.
   */
  sidebarWidth?: number;
  /** Optional header rendered above the menu items (e.g. a brand row). */
  sidebarHeader?: React.ReactNode;
  /** Optional footer rendered below the menu items (e.g. a primary action). */
  sidebarFooter?: React.ReactNode;
  /** The content pane. */
  children?: React.ReactNode;
}
