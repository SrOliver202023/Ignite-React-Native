import React from 'react';
import { StatusBar, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../../components/Button';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import {
  Container
} from './styles';

const WIDTH = Dimensions.get('window').width;

export function SplashOld() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 150,
            easing: Easing.linear
            // easing: Easing.bezier(0, 1.18, .28, 1.48)
          })
        },
      ]
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container >
      <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />

      <Animated.View
        style={[styles.box, animatedStyles]}
      />

      <Button
        title='Mover'
        onPress={handleAnimationPosition}
        color='#4ba9c8'
      // style={{ width: 'auto' }}
      />

    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});

// https://cubic-bezier.com/#0,0,1,1