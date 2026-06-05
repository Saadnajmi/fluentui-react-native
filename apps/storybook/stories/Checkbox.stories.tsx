import { Checkbox } from '@fluentui-react-native/experimental-checkbox';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Checkbox> = {
  title: 'V1/Checkbox',
  component: Checkbox,
  args: {
    label: 'Checkbox',
    size: 'medium',
    disabled: false,
    required: false,
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'] },
    boxSide: { control: 'select', options: ['start', 'end'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Large: Story = { args: { size: 'large' } };
