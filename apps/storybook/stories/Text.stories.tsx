import { TextV1 as Text } from '@fluentui-react-native/text';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Text> = {
  title: 'V1/Text',
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body1',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['caption2', 'caption1', 'body2', 'body2Strong', 'body1', 'body1Strong'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};
export const Strong: Story = { args: { variant: 'body1Strong' } };
export const Caption: Story = { args: { variant: 'caption1' } };
