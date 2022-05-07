import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

import { RFValue } from 'react-native-responsive-fontsize';

import { Accessory } from '../../components/Accessory';
import { useTheme } from 'styled-components';
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
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

interface RentalPeriod {
  start: number;
  end: number;
  startFormatted?: string;
  endFormatted?: string;
}

interface RouteParams {
  car: CarDTO;
  dates: string[];
  rentalPeriod: RentalPeriod;
}


export function SchedulingDetails({ navigation }: { navigation: NavigationProp<any>; }) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const route = useRoute();
  const { car, dates, rentalPeriod } = route.params as RouteParams;

  const rentalPriceTotal = car.price * dates.length;

  function handleBackToScheduling() {
    navigation.goBack();
  }
  async function handleConfirmRental() {
    setLoading(true);

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];
    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: rentalPeriod.startFormatted,
      endDate: rentalPeriod.endFormatted
    });


    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
      .then(() => navigation.navigate('Confirmation', {
        title: "Carro alugado!",
        message:
          `Agora você só precisa ir \naté a concessionária da RENTX \npegar o seu automóvel.`,
        nextScreenRoute: "Home"

      }))
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento.');
        setLoading(false);
      });
  }

  useEffect(() => {


  }, []);

  return (
    <Container>

      <StatusBar
        barStyle='dark-content'
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton
          onPress={handleBackToScheduling}
        />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)} />)
          )}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(20)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(20)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>

        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            {/* <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota> */}
            <RentalPriceQuota>R$ {`${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalPriceTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>

    </Container>
  );
}