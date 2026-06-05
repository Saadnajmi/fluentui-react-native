import { Avatar } from '@fluentui-react-native/avatar';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Avatar> = {
  title: 'V1/Avatar',
  component: Avatar,
  args: {
    size: 72,
    name: 'Erik Nason',
    avatarColor: 'colorful',
    active: 'active',
    activeAppearance: 'ring',
  },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 128, step: 4 } },
    active: { control: 'select', options: ['active', 'inactive', 'unset'] },
    activeAppearance: { control: 'select', options: ['ring', 'shadow', 'ring-shadow'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
export const Inactive: Story = { args: { active: 'inactive' } };
export const Small: Story = { args: { size: 24 } };
