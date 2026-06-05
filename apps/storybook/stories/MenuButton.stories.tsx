import { MenuButton } from '@fluentui-react-native/experimental-menu-button';
import type { MenuButtonItemProps } from '@fluentui/react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

const menuItems: MenuButtonItemProps[] = [
  { itemKey: '1', text: 'MenuItem 1' },
  { itemKey: '2', text: 'MenuItem 2' },
  { itemKey: '3', text: 'MenuItem 3', disabled: true },
];

const meta: Meta<typeof MenuButton> = {
  title: 'V1/MenuButton',
  component: MenuButton,
  args: {
    content: 'MenuButton',
    menuItems,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
