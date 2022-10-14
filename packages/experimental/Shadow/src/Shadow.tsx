import * as React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { ShadowProps, shadowName } from './Shadow.types';
import { mergeProps, stagedComponent } from '@fluentui-react-native/framework';
import { getShadowTokenStyleSet } from './shadowStyle';
import { memoize } from '@fluentui-react-native/framework';
import { ShadowToken } from '@fluentui-react-native/theme-types';

export const Shadow = stagedComponent((props: ShadowProps) => {
  return (final: ShadowProps, children: React.ReactNode) => {
    /**
     * Don't render additional views if we don't need to.
     * On Android, we still want the extra outer view to constrain a ripple that
     * may be present in the inner view, due to the following bug:
     * https://stackoverflow.com/questions/63048178/ripple-effect-leaking-at-corners-as-if-pressable-button-has-a-borderradius
     **/
    if (!props.shadowToken && Platform.OS !== 'android') {
      return <>{children}</>;
    }

    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const child = childrenArray[0];

    if (__DEV__) {
      if (childrenArray.length !== 1) {
        console.warn('Shadow must only have one child');
      }
    }

    const { style: childStyle, ...restOfChildProps } = child.props;

    const shadowViewStyleProps = getStylePropsForShadowViews(childStyle, props.shadowToken);
    const innerShadowViewProps = mergeProps(restOfChildProps, shadowViewStyleProps.inner);
    const outerShadowViewProps = mergeProps(final, shadowViewStyleProps.outer);

    const childWithInnerShadow = React.cloneElement(child, innerShadowViewProps);

    return <View {...outerShadowViewProps}>{childWithInnerShadow}</View>;
  };
});

const getStylePropsForShadowViews = memoize(getStylePropsForShadowViewsWorker);
function getStylePropsForShadowViewsWorker(childStyleProps: ViewStyle = {}, shadowToken: ShadowToken) {
  const shadowTokenStyleSet = getShadowTokenStyleSet(shadowToken);

  const {
    borderBottomWidth,
    borderEndWidth,
    borderLeftWidth,
    borderRightWidth,
    borderStartWidth,
    borderTopWidth,
    borderWidth,

    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,

    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,

    alignItems,

    flexWrap,
    flexDirection,

    start,
    end,
    left,
    right,
    top,
    bottom,

    ...restOfChildStyleProps
  } = childStyleProps;

  if (__DEV__) {
    if (!childStyleProps.backgroundColor) {
      console.warn('The View that the Shadow is set on must have a background color set');
    }
  }

  return {
    inner: {
      style: {
        borderBottomWidth,
        borderEndWidth,
        borderLeftWidth,
        borderRightWidth,
        borderStartWidth,
        borderTopWidth,
        borderWidth,

        padding,
        paddingBottom,
        paddingEnd,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingStart,
        paddingTop,
        paddingVertical,

        alignItems,

        flexWrap,
        flexDirection,

        ...shadowTokenStyleSet.ambient,
        ...restOfChildStyleProps,
      },
    },
    outer: {
      style: {
        margin,
        marginBottom,
        marginEnd,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginStart,
        marginTop,
        marginVertical,

        start,
        end,
        left,
        right,
        top,
        bottom,

        ...shadowTokenStyleSet.key,
        ...restOfChildStyleProps,
      },
    },
  };
}

Shadow.displayName = shadowName;

export default Shadow;
