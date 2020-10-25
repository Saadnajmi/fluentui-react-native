import * as React from 'react';
import { View, StyleSheet, Platform, Picker } from 'react-native';
import Modal from 'react-native-modal';
// import { Picker } from '../Picker';
import { Text } from '@fluentui-react-native/experimental-text';
import { Button } from '@fluentui-react-native/experimental-button';
import { lightnessOptions, testerTheme } from './CustomThemes';
import { themeChoices, ThemeNames } from './applyTheme';
import { brandOptions, OfficeBrand } from './applyBrand';

export const themePickerStyles = StyleSheet.create({
  pickerRoot: {
    flexDirection: Platform.OS !== 'ios' || Platform.OS !== 'ios' ? 'row' : 'column',
  },

  picker: {
    flexDirection: Platform.OS !== 'ios' || Platform.OS !== 'ios' ? 'row' : 'column',
    alignItems: 'center',
    padding: 4,
  },

  dropdown: {
    height: 30,
    width: 90,
    fontSize: 12,
  },
});

type PartPickerEntry = { label: string; value: string };

type PartPickerProps = {
  initial: string;
  contents: PartPickerEntry[];
  onChange: (value: string) => void;
};

export const PartPicker: React.FunctionComponent<PartPickerProps> = (props: PartPickerProps) => {
  const { initial, contents, onChange } = props;
  const [value, setValue] = React.useState(initial);
  const onValueChange = React.useCallback(
    (newValue: React.ReactText) => {
      setValue(newValue.toString());
      onChange(newValue.toString());
    },
    [setValue, onChange],
  );
  return (
    <Picker selectedValue={value} style={themePickerStyles.dropdown} onValueChange={onValueChange}>
      {contents.map((entry: PartPickerEntry, index: number) => (
        <Picker.Item label={entry.label} value={entry.value} key={`entry${index}`} />
      ))}
    </Picker>
  );
};

const PickerLabel = Text.customize({ variant: 'bodySemibold' });

const ThemePickerRoot: React.FunctionComponent<{}> = () => {
  const onBrandChange = React.useCallback((newBrand: string) => {
    testerTheme.brand = newBrand as OfficeBrand;
  }, []);

  const onThemeSelected = React.useCallback((newTheme: string) => {
    testerTheme.themeName = newTheme as ThemeNames;
  }, []);

  const onAppearanceChange = React.useCallback((newAppearance: string) => {
    testerTheme.appearance = newAppearance as 'light' | 'dark' | 'dynamic';
  }, []);

  return (
    <View style={themePickerStyles.pickerRoot}>
      <View style={themePickerStyles.picker}>
        <PickerLabel>Theme: </PickerLabel>
        {/* <PartPicker initial={testerTheme.themeName} onChange={onThemeSelected} contents={themeChoices} /> */}
      </View>

      <View style={themePickerStyles.picker}>
        <PickerLabel>Light/Dark: </PickerLabel>
        {/* <PartPicker initial={testerTheme.appearance} onChange={onAppearanceChange} contents={lightnessOptions} /> */}
      </View>

      <View style={themePickerStyles.picker}>
        <PickerLabel>Brand: </PickerLabel>
        {/* <PartPicker initial={testerTheme.brand} onChange={onBrandChange} contents={brandOptions} /> */}
      </View>
    </View>
  );
};

export const ThemePickers: React.FunctionComponent<{}> = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const [modalVisible, setModalVisible] = React.useState(false);
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    return (
      <View>
        <Button primary content="Styling" onClick={toggleModal} />
        <Modal isVisible={modalVisible} hasBackdrop={true} o nBackdropPress={() => setModalVisible(false)}>
          <ThemePickerRoot />
          <Button primary content="Close" onClick={toggleModal} />
        </Modal>
      </View>
    );
  } else {
    return <ThemePickerRoot />;
  }
};
