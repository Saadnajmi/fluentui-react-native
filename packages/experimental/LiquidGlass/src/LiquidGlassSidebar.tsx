import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { LiquidGlassSidebarProps } from './LiquidGlassSidebar.types';

/**
 * JS fallback for `LiquidGlassSidebar`, used on every platform that does not provide the
 * native macOS implementation (Windows / iOS / Android / web). It renders the same declarative
 * `items` as pressable rows so the API is identical cross-platform; a platform can later drop
 * in its own native implementation via a `LiquidGlassSidebar.<platform>.tsx` file.
 */
export const LiquidGlassSidebar = (props: LiquidGlassSidebarProps) => {
  const { items = [], selectedKey, onSelectItem, sidebarWidth = 280, sidebarHeader, sidebarFooter, children, style, ...rest } = props;

  return (
    <View style={[styles.root, style]} {...rest}>
      <View style={[styles.sidebar, { width: sidebarWidth }]}>
        {sidebarHeader}
        <View style={styles.menu}>
          {items.map((item) => {
            const selected = item.key === selectedKey;
            return (
              <Pressable
                key={item.key}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => onSelectItem?.(item.key)}
                style={({ pressed }) => [styles.row, selected && styles.rowSelected, pressed && styles.rowPressed]}
              >
                {item.icon ? <Text style={styles.icon}>{item.icon}</Text> : null}
                <Text style={styles.label} numberOfLines={1}>
                  {item.label}
                </Text>
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
        <View style={styles.spacer} />
        {sidebarFooter}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row' },
  sidebar: { paddingVertical: 12, paddingHorizontal: 10, backgroundColor: 'rgba(120,120,140,0.12)' },
  menu: { marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, marginBottom: 2 },
  rowSelected: { backgroundColor: 'rgba(120,120,160,0.24)' },
  rowPressed: { backgroundColor: 'rgba(120,120,160,0.34)' },
  icon: { width: 24, fontSize: 15 },
  label: { flexShrink: 1, fontSize: 13 },
  badge: { marginLeft: 'auto', minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 5, backgroundColor: '#FF5E7E', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: 'white', fontSize: 11 },
  spacer: { flex: 1 },
  content: { flex: 1 },
});

export default LiquidGlassSidebar;
