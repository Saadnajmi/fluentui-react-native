import * as React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@fluentui-react-native/avatar';
import { ButtonV1 as Button } from '@fluentui-react-native/button';
import { LiquidGlassSidebar } from '@fluentui-react-native/liquid-glass-view';
import { TextV1 as Text } from '@fluentui-react-native/text';
import type { Meta, StoryObj } from '@storybook/react-native';

const navItems = [
  { icon: '💬', label: 'Chats', body: 'Your recent conversations show up here.' },
  { icon: '📁', label: 'Files', body: 'Documents and attachments you have shared.' },
  { icon: '🗓️', label: 'Calendar', body: 'Upcoming meetings and events.' },
  { icon: '⭐️', label: 'Starred', body: 'Messages and files you have flagged.' },
  { icon: '⚙️', label: 'Settings', body: 'Tune your workspace preferences.' },
];

const SIDEBAR_WIDTH = 260;

// A real native macOS split view (NSSplitViewController) with a Liquid Glass sidebar. Child 0
// is hosted in the glass sidebar pane; child 1 in the content pane (its background extends
// under the floating sidebar via NSBackgroundExtensionView on macOS 26). The wrapper lays its
// two children out as a row whose widths match the native panes.
const NativeSidebar: React.FunctionComponent = () => {
  const [selected, setSelected] = React.useState(0);
  const active = navItems[selected];

  return (
    <LiquidGlassSidebar sidebarWidth={SIDEBAR_WIDTH} style={styles.root}>
      <View style={styles.sidebar}>
        <View style={styles.brandRow}>
          <Avatar size={32} name="Fluent UI" avatarColor="colorful" />
          <Text variant="body1Strong" style={styles.brand}>
            Fluent
          </Text>
        </View>
        {navItems.map((item, i) => (
          <Pressable
            key={item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: i === selected }}
            onPress={() => setSelected(i)}
            style={({ pressed }) => [styles.navItem, i === selected && styles.navItemActive, pressed && styles.navItemPressed]}
          >
            <Text variant="body1" style={styles.navIcon}>
              {item.icon}
            </Text>
            <Text variant="body1">{item.label}</Text>
          </Pressable>
        ))}
        <View style={styles.spacer} />
        <Button appearance="primary">New chat</Button>
      </View>

      <View style={styles.content}>
        <Text variant="largeTitle">
          {active.icon} {active.label}
        </Text>
        <Text variant="body1" style={styles.contentBody}>
          {active.body}
        </Text>
        <Text variant="caption1" style={styles.contentHint}>
          {Platform.OS === ('macos' as string) ? 'NSSplitViewController · macOS 26 Liquid Glass sidebar' : 'Native split view (macOS)'}
        </Text>
      </View>
    </LiquidGlassSidebar>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', minHeight: 480, borderRadius: 12, overflow: 'hidden' },
  sidebar: { width: SIDEBAR_WIDTH, padding: 16 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  brand: { marginLeft: 10 },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 8, marginBottom: 2 },
  navItemActive: { backgroundColor: 'rgba(120,120,160,0.22)' },
  navItemPressed: { backgroundColor: 'rgba(120,120,160,0.34)' },
  navIcon: { width: 26 },
  spacer: { flex: 1 },
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
