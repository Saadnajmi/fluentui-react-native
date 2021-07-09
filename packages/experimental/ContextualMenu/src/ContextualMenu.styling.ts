import { ContextualMenuProps, ContextualMenuSlotProps, ContextualMenuTokens } from './ContextualMenu.types';
import { UseStylingOptions, buildProps } from '@fluentui-react-native/framework';

export const stylingSettings: UseStylingOptions<ContextualMenuProps, ContextualMenuSlotProps, ContextualMenuTokens> = {
  // tokens: null,
  // states: null,
  slotProps: {
    root: buildProps(() => ({})),
    container: buildProps(() => ({})),
  },
  tokensThatAreAlsoProps: null,
};
