import * as React from 'react';
import { FocusTrapZone } from '..';
import * as renderer from 'react-test-renderer';
import { View } from 'react-native';

it('FocusTrapZone default props', () => {
  const tree = renderer.create(<FocusTrapZone />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('FocusTrapZone all props props', () => {
  const ref: React.RefObject<View> = { current: null };
  const tree = renderer
    .create(<FocusTrapZone componentRef={ref} disableFirstFocus disabled ignoreExternalFocusing focusPreviouslyFocusedInnerElement />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
