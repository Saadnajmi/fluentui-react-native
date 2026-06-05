const base = require('@fluentui-react-native/babel-config');

// The full on-device Storybook UI uses react-native-reanimated, whose babel plugin must be
// listed last. The shared FURN babel config keeps its plugins under `overrides`, so adding
// the reanimated plugin as the sole top-level plugin keeps it last.
module.exports = {
  ...base,
  plugins: [...(base.plugins || []), 'react-native-reanimated/plugin'],
};
