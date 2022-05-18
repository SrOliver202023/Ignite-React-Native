import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

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
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home({ navigation }: { navigation: NavigationProp<any>; }) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        setLoading(true);
        const response = await api.get('/cars');

        if (isMounted) {
          setCars(response.data as CarDTO[]);
          // console.log('Hello!');
        }
      } catch (error) {
        Alert.alert(`Error ao carregar lista de carros - Tente novamente mais tarde!`);
      }
      finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
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

          {!loading &&
            <TotalCars>
              Total {cars.length === 1 ? `1 carro` : `${cars.length} carros`}
            </TotalCars>
          }

        </HeaderContent>
      </Header>

      {
        loading ? <LoadAnimation /> :
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