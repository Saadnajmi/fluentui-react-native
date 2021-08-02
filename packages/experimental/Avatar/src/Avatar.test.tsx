import * as React from 'react';
import { Avatar } from './Avatar';
import * as renderer from 'react-test-renderer';

it('ActivityIndicator default', () => {
  const tree = renderer.create(<Avatar />).toJSON();
  expect(tree).toMatchSnapshot();
});
