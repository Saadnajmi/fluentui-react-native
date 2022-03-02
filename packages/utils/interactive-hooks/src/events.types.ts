import { AccessibilityActionEvent, GestureResponderEvent } from 'react-native';
import { KeyPressEvent } from './Pressability/CoreEventTypes';

export type InteractionEvent = GestureResponderEvent | KeyPressEvent | AccessibilityActionEvent;

export const isGestureResponderEvent = (e: InteractionEvent): e is GestureResponderEvent => {
  if ('touches' in e.nativeEvent) {
    return true;
  }

  return false;
};

export const isKeyPressEvent = (e: InteractionEvent): e is KeyPressEvent => {
  if ('key' in e.nativeEvent) {
    return true;
  }

  return false;
};

export const isAccessibilityActionEvent = (e: InteractionEvent): e is AccessibilityActionEvent => {
  if ('actionName' in e.nativeEvent) {
    return true;
  }

  return false;
};
