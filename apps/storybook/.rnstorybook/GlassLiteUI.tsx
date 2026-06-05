import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { LiquidGlassView } from '@fluentui-react-native/liquid-glass-view';
import { LiteUI } from '@storybook/react-native-ui-lite';

// Props handed to a getStorybookUI `CustomUIComponent` (see @storybook/react-native
// getStorybookUI → index.js:1221). LiteUI consumes exactly this shape.
type GlassLiteUIProps = {
  theme?: any;
  [key: string]: unknown;
};

const SIDEBAR_WIDTH = 270;

/**
 * The storybook lite on-device UI (`LiteUI`) with its navigator column rendered on a macOS
 * Liquid Glass surface.
 *
 * `LiteUI`'s desktop `Layout` paints its whole row — sidebar + canvas — on
 * `theme.background.content`, and the sidebar has no background of its own. So we make that
 * surface translucent and place a `LiquidGlassView` (plus a colorful backdrop, since glass
 * only reads when there is content behind it to refract) behind the navigator column. The
 * sidebar then reads as Liquid Glass; the canvas keeps an opaque surface. On macOS < 26 /
 * other platforms the glass degrades to vibrancy.
 *
 * Wired via `getStorybookUI({ CustomUIComponent: GlassLiteUI })` because storybook's
 * `liteMode` resolver is a no-op under yarn pnpm (it matches the slash path
 * `@storybook/react-native-ui`, but the store path is the dash form).
 */
export const GlassLiteUI: React.FunctionComponent<GlassLiteUIProps> = (props) => {
  const glassTheme = React.useMemo(() => {
    const base = props.theme ?? {};
    return {
      ...base,
      background: {
        ...(base.background ?? {}),
        // Navigator column is transparent so the glass shows; canvas gets a solid surface below.
        content: 'transparent',
        hoverable: 'rgba(255,255,255,0.18)',
      },
    };
  }, [props.theme]);

  const canvasColor = props.theme?.background?.content ?? '#1b1b1f';

  return (
    <View style={styles.root}>
      {/* Opaque canvas surface so only the navigator column reads as glass. */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: canvasColor }]} pointerEvents="none" />

      {/* Glass navigator column: colorful backdrop -> glass -> (LiteUI sidebar on top). */}
      <View style={styles.sidebarLayer} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#FF5E7E', top: 40, left: -70 }]} />
        <View style={[styles.blob, { backgroundColor: '#0F6CBD', top: 250, left: 30 }]} />
        <View style={[styles.blob, { backgroundColor: '#6E4BD8', top: 470, left: -50 }]} />
        <View style={[styles.blob, { backgroundColor: '#37C871', top: 150, left: 110 }]} />
        <LiquidGlassView style={StyleSheet.absoluteFill} cornerRadius={0} />
      </View>

      <LiteUI {...props} theme={glassTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  sidebarLayer: { position: 'absolute', left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH, overflow: 'hidden' },
  blob: { position: 'absolute', width: 220, height: 220, borderRadius: 110, opacity: 0.9 },
});

export default GlassLiteUI;
