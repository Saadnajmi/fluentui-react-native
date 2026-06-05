import { TabList, Tab } from '@fluentui-react-native/tablist';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof TabList> = {
  title: 'V1/TabList',
  component: TabList,
  render: (args) => (
    <TabList defaultSelectedKey="home" {...args}>
      <Tab tabKey="home">Home</Tab>
      <Tab tabKey="files">Files</Tab>
      <Tab tabKey="shared" disabled>
        Shared
      </Tab>
      <Tab tabKey="settings">Settings</Tab>
    </TabList>
  ),
};

export default meta;
type Story = StoryObj<typeof TabList>;

export const Default: Story = {};
