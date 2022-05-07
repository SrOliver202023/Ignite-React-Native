import React, { useEffect } from 'react';

import { StatusBar } from 'react-native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import {
  Container
} from './styles';
import { NavigationProp } from '@react-navigation/native';

export function Splash({ navigation }: { navigation: NavigationProp<any>; }) {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -100])
        }
      ]
    };
  });
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-100, 0])
        }
      ]
    };
  });

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50,
      { duration: 1000 },
      () => {
        'worklet';
        runOnJS(startApp)();
      });
  }, []);

  return (
    <Container >
      <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />
      <Animated.View style={[{ position: 'absolute' }, brandStyle]}>
        <BrandSvg
          width={80} height={50}
        />
      </Animated.View>

      <Animated.View style={[{ position: 'absolute' }, logoStyle]}>
        <LogoSvg
          width={180} height={20}
        />
      </Animated.View>

    </Container>
  );
}
