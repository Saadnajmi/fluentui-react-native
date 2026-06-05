import { RadioGroupV1 as RadioGroup, Radio } from '@fluentui-react-native/radio-group';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof RadioGroup> = {
  title: 'V1/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Select a fruit:',
    defaultValue: 'A',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Apple" value="A" />
      <Radio label="Pear" value="B" />
      <Radio label="Banana" value="C" />
      <Radio label="Orange" value="D" disabled />
    </RadioGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
