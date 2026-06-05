import type { Preview } from '@storybook/react-native';

import { withFluentTheme } from './withFluentTheme';

const preview: Preview = {
  decorators: [withFluentTheme],
  parameters: {},
};

export default preview;
