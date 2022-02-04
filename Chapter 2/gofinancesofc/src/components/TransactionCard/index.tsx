import React, { useEffect, useState, useCallback, RefAttributes } from 'react';
import { categories } from '../../utils/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Header,
  Title,
  ButtonDelete,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date

} from './styles';
import { useNavigation } from '@react-navigation/native';

const dataKey = '@gofinances:transactions';

interface IVectorsDefault {
  trash: 'trash-2';
}

export interface ITransactionCardProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface IPropsData {
  data: ITransactionCardProps;
  deleteItem: (id: string) => void;
}

type NavigationProps = { navigate: (screen: string) => void; };

export function TransactionCard({ data, deleteItem }: IPropsData) {
  const [category] = categories.filter(item => item.key === data.category);
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>

        <ButtonDelete
          onPress={() => deleteItem(data.id)}
        >
          <Icon name='trash-2' />
        </ButtonDelete>

      </Header>
      <Amount type={data.type}>
        {data.type === 'negative' ? `- ${data.amount}` : data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>
            {category.name}
          </CategoryName>
        </Category>
        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  );
}