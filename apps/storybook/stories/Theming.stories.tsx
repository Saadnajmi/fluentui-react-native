import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@fluentui-react-native/theme-types';
import type { Meta, StoryObj } from '@storybook/react-native';

/**
 * Renders the active theme's color tokens as swatches. Switch the Theme / Appearance
 * controls in the toolbar above to see the tokens (and every other story) re-theme live.
 */
const ColorTokenSwatches = () => {
  const theme = useTheme();
  const entries = Object.entries(theme.colors ?? {}).filter(([, value]) => typeof value === 'string') as [string, string][];

  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {entries.map(([name, value]) => (
        <View key={name} style={styles.cell}>
          <View style={[styles.swatch, { backgroundColor: value }]} />
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 96,
    margin: 4,
    alignItems: 'center',
  },
  swatch: {
    width: 88,
    height: 44,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#888',
  },
  name: {
    fontSize: 9,
    marginTop: 2,
  },
});

const meta: Meta<typeof ColorTokenSwatches> = {
  title: 'Theming/Color Tokens',
  component: ColorTokenSwatches,
};

export default meta;
type Story = StoryObj<typeof ColorTokenSwatches>;

export const ColorTokens: Story = {};
