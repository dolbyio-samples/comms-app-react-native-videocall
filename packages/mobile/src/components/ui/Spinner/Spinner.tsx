import type { ColorKey } from '@dolbyio/comms-uikit-common';
import React, { useState } from 'react';
import { Animated, View } from 'react-native';

import Icon, { IconSize } from '../Icon/Icon';

export type SpinnerProps = {
  size?: IconSize;
  spinnerColor?: ColorKey;
  testID?: string;
};

const Spinner = ({ size = 'm', spinnerColor = 'primary.400', testID }: SpinnerProps) => {
  const rotateAnimation = new Animated.Value(0);

  const handleAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start(() => {
      rotateAnimation.setValue(0);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  handleAnimation();
  return (
    <Animated.View style={animatedStyle} testID={testID}>
      <Icon name="loader" color={spinnerColor} size={size} />
    </Animated.View>
  );
};

export default Spinner;
