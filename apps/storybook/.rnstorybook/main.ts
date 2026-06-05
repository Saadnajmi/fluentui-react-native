import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  // Lite mode (see ../metro.config.js) mocks out the Storybook manager UI, so the
  // on-device addon panels (controls/actions) are intentionally omitted — they require
  // the manager `addons.register` API that lite mode does not provide. Stories show their
  // default args; theme switching is handled by the on-device decorator in ./withFluentTheme.
  deviceAddons: [],
};

export default main;
