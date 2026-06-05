import type { Meta, StoryObj } from '@storybook/react-native';

import { ChatPane } from '../src/screens/ChatPane';

// An example screen that composes Avatar, Text, Button and live theming into a chat pane.
const meta: Meta<typeof ChatPane> = {
  title: 'Examples/Chat Pane',
  component: ChatPane,
};

export default meta;
type Story = StoryObj<typeof ChatPane>;

export const Default: Story = {};
