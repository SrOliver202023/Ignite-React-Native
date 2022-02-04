import React, {
  useState,
  useEffect,
  useCallback

} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Header,
  Title,
  ContentScroll,
  ChartContainer,

  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,

  LoadingContainer

} from './styles';

import { categories } from '../../utils/categories';

import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';



import { VictoryPie } from 'victory-native';

interface ITransactionData {
  // id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface ICategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}


export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  const theme = useTheme();

  async function handleDateChange(action: 'next' | 'prev') {
    setIsLoading(true);

    if (action === 'next') setSelectedDate(addMonths(selectedDate, 1));
    else setSelectedDate(subMonths(selectedDate, 1));

    await loadData();
  }


  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: [] = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: ITransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()

      );

    const expensivesTotal = expensives
      .reduce((acumullator: number, expensive: ITransactionData) => {
        return acumullator + Number(expensive.amount);
      }, 0);

    const totalByCategory: ICategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);

        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)} %`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent
        });
      }
    });

    // const orderByValues = totalByCategory.sort((old, now) => compare(old, now, 'total'));
    const orderByValues = totalByCategory.sort((old, now) => old.total < now.total ? 1 : -1);

    setTotalByCategories(orderByValues);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>

      <Header>
        <Title>Resumo por categorias</Title>
      </Header>
      {
        isLoading ?
          <LoadingContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size='large'
            />
          </LoadingContainer> :

          <ContentScroll
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight()
            }}

          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name='chevron-left' />
              </MonthSelectButton>

              <Month>

                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}

              </Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name='chevron-right' />

              </MonthSelectButton>

            </MonthSelect>



            <ChartContainer>
              <VictoryPie
                width={RFPercentage(100)}
                height={RFPercentage(50)}
                data={totalByCategories.map(item => item)}
                colorScale={totalByCategories.map(item => item.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={65}
                x='percent'
                y='total'
              />
            </ChartContainer>

            {
              totalByCategories.map(item => (
                <HistoryCard
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              )
              )
            }
          </ContentScroll>
      }
    </Container >
  );
}