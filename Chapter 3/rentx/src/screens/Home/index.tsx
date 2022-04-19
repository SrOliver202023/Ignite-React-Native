import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList,
  // MyCarsButton,

} from './styles';
import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { NavigationProp } from '@react-navigation/native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/car';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

export function Home({ navigation }: { navigation: NavigationProp<any>; }) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const response = await api.get('/cars');
        setCars(response.data as CarDTO[]);
      } catch (error) {
        Alert.alert(`Error ao carregar lista de carros - Tente novamente mais tarde!`);
      }
      finally {
        setLoading(false);
      }
    }
    fetchCars();

  }, []);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total {cars.length === 1 ? `1 carro` : `${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        loading ? <Load /> :
          <CarsList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />}
          />
      }
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}

        >
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22,
              }
            ]}
          >
            <ButtonAnimated
              onPress={handleOpenMyCars}
              style={[styles.button, { backgroundColor: theme.colors.main }]}
            >
              <Ionicons
                name='ios-car-sport'
                size={38}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});