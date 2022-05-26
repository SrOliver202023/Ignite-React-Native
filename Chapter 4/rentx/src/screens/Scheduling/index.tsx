import React, { useState } from 'react';
import { Alert, StatusBar } from "react-native";
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayDateProps, generateDateInterval, MarkedDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/car';

interface RentalPeriod {
  start: number;
  end: number;
  startFormatted?: string;
  endFormatted?: string;
}

interface RouteParams {
  car: CarDTO;
}

export function Scheduling({ navigation }: { navigation: NavigationProp<any>; }) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayDateProps>({} as DayDateProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Selecione um intervalo de aluguel!");
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
        period: rentalPeriod
      });
    }
  }

  function handleBackToCarDetails() {
    navigation.goBack();
  }

  function handleChangeDate(dayDate: DayDateProps) {
    let start = !lastSelectedDate.timestamp ? dayDate : lastSelectedDate;
    let end = dayDate;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateDateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
      start: start.timestamp,
      end: end.timestamp,
    });
  }
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <Header>
        <BackButton
          onPress={handleBackToCarDetails}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!!rentalPeriod.startFormatted} >
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!!rentalPeriod.endFormatted} >
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>

        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>

    </Container>
  );
}