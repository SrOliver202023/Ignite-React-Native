import React from 'react';
import { StatusBar } from "react-native";

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

interface RouteParams {
  car: CarDTO;
}

export function CarDetails({ navigation }: { navigation: NavigationProp<any>; }) {
  const route = useRoute();
  const { car } = route.params as RouteParams;

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
      <Header>
        <BackButton
          onPress={handleBackToHome}
        />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content
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
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>


    </Container>
  );
}