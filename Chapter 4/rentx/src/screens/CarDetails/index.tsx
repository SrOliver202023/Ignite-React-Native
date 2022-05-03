import React, { useState } from 'react';
import { StatusBar, StyleSheet } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
  interpolateColors,
  useEvent,
  useDerivedValue,
  color
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from "../../components/Button";
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { Accessory } from '../../components/Accessory';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface RouteParams {
  car: CarDTO;
}

export function CarDetails({ navigation }: { navigation: NavigationProp<any>; }) {
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as RouteParams;
  const scrollY = useSharedValue(0);

  const toColor = useDerivedValue(() => {
    return {
      background: interpolateColor(
        scrollY.value,
        [0, 100],
        [theme.colors.background_secondary, theme.colors.main]
      ),
      font: interpolateColor(
        scrollY.value,
        [0, 100],
        [theme.colors.main, theme.colors.background_secondary]
      )
    };
  });


  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log();
    // console.log(event.contentOffset.y);
  });


  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: toColor.value.background,
      paddingBottom: interpolate(
        scrollY.value,
        [0, 10],
        [0, 78],
        Extrapolate.CLAMP
      ),
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    };
  });

  function handleBackToHome() {
    navigation.goBack();
  }
  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="transparent"
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
        ]}
      >
        <Header>
          <BackButton
            style={[styles.back]}
            onPress={handleBackToHome}
          />
        </Header>

        <Animated.View
          style={[sliderCarsStyleAnimation]}
        >
          <CarImages>
            <ImageSlider
              imagesUrl={car.photos}
            />
          </CarImages>
        </Animated.View>

      </Animated.View>


      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: 'center',
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}

        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {
              car.rent.price.toFixed(2)
            }</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)} />)
          )
          }
        </Accessories>

        <About style={{ textAlign: 'justify' }}>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>


    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    marginTop: 24
  }

});