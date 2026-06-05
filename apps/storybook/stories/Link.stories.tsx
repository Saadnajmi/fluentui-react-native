import { LinkV1 as Link } from '@fluentui/react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Link> = {
  title: 'V1/Link',
  component: Link,
  args: {
    children: 'FluentUI React Native',
    url: 'https://github.com/microsoft/fluentui-react-native',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};
export const Inline: Story = { args: { inline: true, children: 'an inline link' } };
export const Disabled: Story = { args: { disabled: true } };
