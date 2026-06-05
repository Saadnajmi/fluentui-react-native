import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { LiquidGlassSidebar } from '@fluentui-react-native/liquid-glass-view';
import { TextV1 as Text } from '@fluentui-react-native/text';
import type { Meta, StoryObj } from '@storybook/react-native';

const navItems = [
  { key: 'chats', label: 'Chats', icon: '💬', body: 'Your recent conversations show up here.' },
  { key: 'files', label: 'Files', icon: '📁', body: 'Documents and attachments you have shared.' },
  { key: 'calendar', label: 'Calendar', icon: '🗓️', body: 'Upcoming meetings and events.' },
  { key: 'starred', label: 'Starred', icon: '⭐️', body: 'Messages and files you have flagged.' },
  { key: 'settings', label: 'Settings', icon: '⚙️', body: 'Tune your workspace preferences.' },
];

// The sidebar menu is declared with `items` and rendered natively (NSTableView source list) on
// macOS; on other platforms the same items render via the JS fallback. Selection drives the
// React content pane.
const NativeSidebar: React.FunctionComponent = () => {
  const [selectedKey, setSelectedKey] = React.useState('chats');
  const active = navItems.find((i) => i.key === selectedKey) ?? navItems[0];

  return (
    <LiquidGlassSidebar
      sidebarWidth={260}
      items={navItems.map(({ key, label, icon }) => ({ key, label, icon }))}
      selectedKey={selectedKey}
      onSelectItem={setSelectedKey}
      style={styles.root}
    >
      <View style={styles.content}>
        <Text variant="largeTitle">
          {active.icon} {active.label}
        </Text>
        <Text variant="body1" style={styles.contentBody}>
          {active.body}
        </Text>
        <Text variant="caption1" style={styles.contentHint}>
          {Platform.OS === ('macos' as string)
            ? 'Native NSTableView sidebar · macOS 26 Liquid Glass'
            : 'JS fallback sidebar (native on macOS)'}
        </Text>
      </View>
    </LiquidGlassSidebar>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, minHeight: 480, borderRadius: 12, overflow: 'hidden' },
  content: { flex: 1, padding: 28 },
  contentBody: { marginTop: 10, opacity: 0.85 },
  contentHint: { marginTop: 24, opacity: 0.6 },
});

const meta: Meta<typeof NativeSidebar> = {
  title: 'Examples/Native Glass Sidebar',
  component: NativeSidebar,
};

export default meta;
type Story = StoryObj<typeof NativeSidebar>;

export const Default: Story = {};
