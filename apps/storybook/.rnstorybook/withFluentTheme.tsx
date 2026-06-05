import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createFluentTheme } from '@fluentui-react-native/fluent-theme';
import { ThemeProvider, ThemeReference } from '@fluentui-react-native/theme';
import type { ThemeOptions } from '@fluentui-react-native/theme-types';
import type { Decorator } from '@storybook/react-native';

type Appearance = NonNullable<ThemeOptions['appearance']>;

const appearances: { label: string; value: Appearance }[] = [
  { label: 'Auto', value: 'dynamic' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'High Contrast', value: 'highContrast' },
];

// Build a ThemeReference from the same Fluent primitive apps/tester-core uses
// (CustomThemes.ts), so Storybook renders FURN controls with the real Fluent theming.
function makeThemeRef(appearance: Appearance): ThemeReference {
  return new ThemeReference(createFluentTheme({ paletteName: 'TaskPane', appearance }));
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
    marginLeft: 8,
    opacity: 0.7,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 4,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#888',
  },
  chipSelected: {
    backgroundColor: '#0F6CBD',
    borderColor: '#0F6CBD',
  },
  chipText: {
    fontSize: 12,
    color: '#888',
  },
  chipTextSelected: {
    color: '#fff',
  },
  story: {
    flex: 1,
    padding: 12,
  },
});

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Chip = ({ label, selected, onPress }: ChipProps) => (
  <Pressable accessibilityRole="button" onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
  </Pressable>
);

/** Global decorator: an on-device appearance picker that wraps every story in a ThemeProvider. */
export const withFluentTheme: Decorator = (Story) => {
  const [appearance, setAppearance] = React.useState<Appearance>('dynamic');

  const themeRef = React.useMemo(() => makeThemeRef(appearance), [appearance]);

  return (
    <ThemeProvider theme={themeRef}>
      <View style={styles.toolbar}>
        <Text style={styles.label}>Appearance</Text>
        {appearances.map((a) => (
          <Chip key={a.value} label={a.label} selected={a.value === appearance} onPress={() => setAppearance(a.value)} />
        ))}
      </View>
      <View style={styles.story}>
        <Story />
      </View>
    </ThemeProvider>
  );
};
