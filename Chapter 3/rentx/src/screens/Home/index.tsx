import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList,
  MyCarsButton
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
      <MyCarsButton
        onPress={handleOpenMyCars}
      >
        <Ionicons
          name='ios-car-sport'
          size={38}
          color={theme.colors.shape}
        />
      </MyCarsButton>

    </Container>
  );
}