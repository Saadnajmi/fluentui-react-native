import * as React from 'react';
import { ActivityIndicator } from './ActivityIndicator';
import * as renderer from 'react-test-renderer';

it('ActivityIndicator default', () => {
  const tree = renderer.create(<ActivityIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});
