import * as React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@fluentui-react-native/avatar';
import { ButtonV1 as Button } from '@fluentui-react-native/button';
import { LiquidGlassView } from '@fluentui-react-native/liquid-glass-view';
import { TextV1 as Text } from '@fluentui-react-native/text';
import type { Meta, StoryObj } from '@storybook/react-native';

const navItems = [
  { icon: '💬', label: 'Chats', body: 'Your recent conversations show up here.' },
  { icon: '📁', label: 'Files', body: 'Documents and attachments you have shared.' },
  { icon: '🗓️', label: 'Calendar', body: 'Upcoming meetings and events.' },
  { icon: '⭐️', label: 'Starred', body: 'Messages and files you have flagged.' },
  { icon: '⚙️', label: 'Settings', body: 'Tune your workspace preferences.' },
];

// macOS 26 Liquid Glass samples the content behind it, so the demo floats a glass sidebar
// over colorful shapes to make the effect visible. The sidebar is interactive: nav items are
// Pressables (clicks now route into the glass via the native hitTest override) that drive the
// selected section shown to the right.
const GlassSidebar: React.FunctionComponent = () => {
  const [selected, setSelected] = React.useState(0);
  const [chats, setChats] = React.useState(2);
  const active = navItems[selected];

  return (
    <View style={styles.root}>
      <View style={styles.backdrop} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#FF5E7E', top: 30, left: 40 }]} />
        <View style={[styles.blob, { backgroundColor: '#0F6CBD', top: 160, left: 220 }]} />
        <View style={[styles.blob, { backgroundColor: '#6E4BD8', top: 280, left: 90 }]} />
        <View style={[styles.blob, { backgroundColor: '#37C871', top: 90, left: 360 }]} />
      </View>

      <LiquidGlassView cornerRadius={22} style={styles.sidebar}>
        <View style={styles.sidebarInner}>
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
              style={({ pressed }) => [
                styles.navItem,
                i === selected && styles.navItemActive,
                pressed && styles.navItemPressed,
              ]}
            >
              <Text variant="body1" style={styles.navIcon}>
                {item.icon}
              </Text>
              <Text variant="body1">{item.label}</Text>
              {item.label === 'Chats' && chats > 0 ? (
                <View style={styles.badge}>
                  <Text variant="caption1" style={styles.badgeText}>
                    {chats}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          ))}
          <View style={styles.spacer} />
          <Button appearance="primary" onClick={() => setChats((c) => c + 1)}>
            New chat
          </Button>
        </View>
      </LiquidGlassView>

      <View style={styles.content} pointerEvents="none">
        <Text variant="largeTitle">
          {active.icon} {active.label}
        </Text>
        <Text variant="body1" style={styles.contentBody}>
          {active.body}
        </Text>
        <Text variant="caption1" style={styles.contentHint}>
          {Platform.OS === ('macos' as string) ? 'NSGlassEffectView · macOS 26 Liquid Glass' : 'Glass effect (macOS only)'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, minHeight: 460, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1B1B1F' },
  backdrop: { ...StyleSheet.absoluteFillObject },
  blob: { position: 'absolute', width: 200, height: 200, borderRadius: 100, opacity: 0.85 },
  sidebar: { position: 'absolute', top: 24, left: 24, bottom: 24, width: 240 },
  sidebarInner: { flex: 1, padding: 16 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  brand: { marginLeft: 10 },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 8, marginBottom: 2 },
  navItemActive: { backgroundColor: 'rgba(255,255,255,0.16)' },
  navItemPressed: { backgroundColor: 'rgba(255,255,255,0.28)' },
  navIcon: { width: 26 },
  badge: { marginLeft: 'auto', minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 6, backgroundColor: '#FF5E7E', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: 'white' },
  spacer: { flex: 1 },
  content: { position: 'absolute', top: 40, left: 300, right: 32, bottom: 32 },
  contentBody: { marginTop: 10, opacity: 0.85 },
  contentHint: { position: 'absolute', bottom: 0, right: 0, opacity: 0.6 },
});

const meta: Meta<typeof GlassSidebar> = {
  title: 'Examples/Liquid Glass Sidebar',
  component: GlassSidebar,
};

export default meta;
type Story = StoryObj<typeof GlassSidebar>;

export const Default: Story = {};
