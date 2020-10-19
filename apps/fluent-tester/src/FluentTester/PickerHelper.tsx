import { Picker as CommunityPicker } from '@react-native-community/picker';
import { Picker as Win32Picker } from 'react-native';
import React from 'react';
import { ActionSheetIOS, Platform, View, Button } from 'react-native';

class PickerDropDown extends React.Component {
  onIOSButton = () => {
    let options = this.props.children.map((item, i) => {
      return item.props.label;
    });
    options.push('Cancel');
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
      },
      this.onIOSButtonPick,
    );
  };

  onIOSButtonPick = (buttonIndex) => {
    if (buttonIndex < this.props.children.length && buttonIndex != this.props.selectedValue) {
      if (
        typeof this.props.selectedValue === 'undefined' ||
        (typeof this.props.selectedValue !== 'undefined' && buttonIndex != this.findIndexForValue(this.props.selectedValue))
      ) {
        this.props.onValueChange(this.props.children[buttonIndex].props.value, buttonIndex);
      }
    }
  };

  findLabelForValue = (searchValue) => {
    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.value == searchValue) {
        return this.props.children[i].props.label;
      }
    }
    return null;
  };

  findIndexForValue = (searchValue) => {
    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.value == searchValue) {
        return i;
      }
    }
    return -1;
  };

  render() {
    if (Platform.OS === 'ios') {
      let title = '';
      if (this.props.children && this.props.children.length > 0) {
        if (typeof this.props.selectedValue !== 'undefined') {
          title = this.findLabelForValue(this.props.selectedValue);
        } else {
          title = this.props.children[0].props.label;
        }
      }
      return (
        <View>
          <Button
            title={title}
            onPress={this.onIOSButton}
            type="clear"
            icon={{
              name: 'arrow-drop-down',
              size: 15,
              color: 'black',
            }}
            iconRight={true}
          />
        </View>
      );
    } else if (Platform.OS == 'windows') {
      return <Win32Picker {...this.props} />;
    } else {
      return <CommunityPicker {...this.props} />;
    }
  }
}

export default PickerDropDown;
