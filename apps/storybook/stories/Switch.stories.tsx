import { Switch } from '@fluentui-react-native/switch';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Switch> = {
  title: 'V1/Switch',
  component: Switch,
  args: {
    label: 'Switch',
    defaultChecked: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const Off: Story = { args: { defaultChecked: false } };
export const Disabled: Story = { args: { disabled: true } };
