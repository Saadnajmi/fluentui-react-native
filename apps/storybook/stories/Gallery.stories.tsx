import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@fluentui-react-native/avatar';
import { ButtonV1 as Button } from '@fluentui-react-native/button';
import { Checkbox } from '@fluentui-react-native/experimental-checkbox';
import { RadioGroupV1 as RadioGroup, Radio } from '@fluentui-react-native/radio-group';
import { Switch } from '@fluentui-react-native/switch';
import { LinkV1 as Link, TextV1 as Text } from '@fluentui/react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  section: { marginBottom: 18 },
  heading: { marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  item: { marginRight: 12, marginBottom: 8 },
});

const Section: React.FunctionComponent<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text variant="body1Strong" style={styles.heading}>
      {title}
    </Text>
    <View style={styles.row}>{React.Children.map(children, (child) => (
      <View style={styles.item}>{child}</View>
    ))}</View>
  </View>
);

// A single story that showcases many V1 controls at once under the active theme. Useful as
// the landing story while the on-device navigator is unavailable (see README).
const Gallery = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Section title="Button">
      <Button appearance="primary">Primary</Button>
      <Button appearance="subtle">Subtle</Button>
      <Button appearance="outline">Outline</Button>
      <Button appearance="primary" disabled>
        Disabled
      </Button>
    </Section>

    <Section title="Text">
      <Text variant="body1">Body</Text>
      <Text variant="body1Strong">Body Strong</Text>
      <Text variant="caption1">Caption</Text>
    </Section>

    <Section title="Switch">
      <Switch label="On" defaultChecked />
      <Switch label="Off" />
      <Switch label="Disabled" disabled />
    </Section>

    <Section title="Checkbox">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
    </Section>

    <Section title="RadioGroup">
      <RadioGroup label="Pick a fruit" defaultValue="a">
        <Radio label="Apple" value="a" />
        <Radio label="Pear" value="b" />
        <Radio label="Banana" value="c" />
      </RadioGroup>
    </Section>

    <Section title="Link">
      <Link url="https://github.com/microsoft/fluentui-react-native">FluentUI React Native</Link>
    </Section>

    <Section title="Avatar">
      <Avatar size={48} name="Erik Nason" avatarColor="colorful" />
      <Avatar size={48} name="Cameron Evans" avatarColor="colorful" />
      <Avatar size={48} name="Kat Larsson" avatarColor="colorful" />
    </Section>
  </ScrollView>
);

const meta: Meta<typeof Gallery> = {
  title: 'Overview/Gallery',
  component: Gallery,
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const AllControls: Story = {};
