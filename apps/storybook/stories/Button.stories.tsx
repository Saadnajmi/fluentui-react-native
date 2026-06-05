import { ButtonV1 as Button } from '@fluentui-react-native/button';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Button> = {
  title: 'V1/Button',
  component: Button,
  args: {
    children: 'Button',
    appearance: 'primary',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
  },
  argTypes: {
    appearance: { control: 'select', options: ['primary', 'subtle', 'outline', 'accent'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['rounded', 'circular', 'square'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Primary: Story = { args: { appearance: 'primary' } };
export const Subtle: Story = { args: { appearance: 'subtle' } };
export const Outline: Story = { args: { appearance: 'outline' } };
export const Disabled: Story = { args: { disabled: true } };
