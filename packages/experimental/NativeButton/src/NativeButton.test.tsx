import * as React from 'react';
import { NativeButton } from './NativeButton';
import * as renderer from 'react-test-renderer';

it('NativeButton default', () => {
  const tree = renderer.create(<NativeButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
