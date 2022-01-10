import { KeyCallback, KeyPressProps } from './useKeyProps';
import { KeyPressEvent } from './Pressability/CoreEventTypes';
import { memoize } from '@fluentui-react-native/memo-cache';
import * as React from 'react';
import { IHandledKeyboardEvent } from 'react-native-windows';

/**
 * Re-usable hook for an onKeyDown event.
 * @param userCallback The function you want to be called once the key has been activated on key up
 * @param keys A string of the key you want to perform some action on. If undefined, always invokes userCallback
 * @returns onKeyEvent() - Callback to determine if key was pressed, if so, call userCallback
 * @deprecated use useKeyUpProps or useKeyDownProps instead
 */
export function useKeyCallback(userCallback?: KeyCallback, ...keys: string[]) {
  const onKeyEvent = React.useCallback(
    (args: KeyPressEvent) => {
      if (userCallback !== undefined && (keys === undefined || keys.includes(args.nativeEvent.key))) {
        userCallback(args);
        args.stopPropagation();
      }
    },
    [userCallback, ...keys],
  );

  return onKeyEvent;
}

export function getKeyCallbackWorker(userCallback?: KeyCallback, ...keys: string[]) {
  const onKeyEvent = (args: KeyPressEvent) => {
    if (userCallback !== undefined && (keys === undefined || keys.includes(args.nativeEvent.key))) {
      userCallback(args);
      args.stopPropagation();
    }
  };
  return onKeyEvent;
}

function getKeyUpPropsWorker(userCallback: KeyCallback, ...keys: string[]): KeyPressProps {
  return {
    onKeyUp: getKeyCallbackWorker(userCallback, ...keys),
    keyUpEvents: keys.map<IHandledKeyboardEvent>((c) => ({ code: c })),
  };
}

function getKeyDownPropsWorker(userCallback: KeyCallback, ...keys: string[]): KeyPressProps {
  return {
    onKeyDown: getKeyCallbackWorker(userCallback, ...keys),
    keyDownEvents: keys.map<IHandledKeyboardEvent>((c) => ({ code: c })),
  };
}

/**
 * Re-usable hook for an onKeyUp event.
 * @param userCallback The function you want to be called once the key has been activated on key up
 * @param keys A string of the key you want to perform some action on. If undefined, always invokes userCallback
 * @returns KeyPressProps: An object containing the correct platform specific props to handle key press, and suppress the native keypress event
 */
export const useKeyUpProps = memoize(getKeyUpPropsWorker);

/**
 * Re-usable hook for an onKeyDown event.
 * @param userCallback The function you want to be called once the key has been activated on key down
 * @param keys A string of the key you want to perform some action on. If undefined, always invokes userCallback
 * @returns KeyPressProps: An object containing the correct platform specific props to  handle key press, and suppress the native keypress event
 */
export const useKeyDownProps = memoize(getKeyDownPropsWorker);
