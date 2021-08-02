import * as React from 'react';
import { Shimmer } from './Shimmer';
import * as renderer from 'react-test-renderer';

it('Shimmer default', () => {
  const tree = renderer.create(<Shimmer />).toJSON();
  expect(tree).toMatchSnapshot();
});
