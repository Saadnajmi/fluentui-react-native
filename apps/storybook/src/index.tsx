/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import { AppRegistry, LogBox } from 'react-native';

import { ChatPaneDemo } from './ChatPaneDemo';

LogBox.ignoreLogs([/.*deprecated.*/, /.*Platform is not supported.*/]);

// The app's home view is the standalone Chat Pane example (a directly-rendered demo that
// exercises the FluentUI V1 controls + live theming). The Storybook config under
// `.rnstorybook` and the `stories/` showcase remain in the repo for when the on-device
// navigator is usable (full UI on RN 0.81); to run Storybook instead, register the root
// from `require('../.rnstorybook').default`.
AppRegistry.registerComponent('Storybook', () => ChatPaneDemo);

export default ChatPaneDemo;
