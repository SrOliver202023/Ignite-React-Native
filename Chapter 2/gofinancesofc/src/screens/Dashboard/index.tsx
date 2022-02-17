import React, { useCallback, useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import {

  Container, Header,
  UserInfo, Photo, User,
  UserGreeting, UserName,
  UserWrapper, Icon, HighlightCards,
  Transactions, Title, TransactionsList,
  LogoutButton, LoadingContainer

} from './styles';

import { useFocusEffect } from '@react-navigation/native';

import { TransactionCard, ITransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import { useAuth } from '../../hooks/auth';

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

import { IRefreshContext } from '../../providers/RefreshTransactions';
import { ActivityIndicator } from 'react-native';



interface IHilightProps {
  amount: string;
  lastTransaction: string;
}
interface IHighlightData {
  entries: IHilightProps,
  expensives: IHilightProps;
  total: IHilightProps;
}

export function Dashboard(props: IRefreshContext) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [highlightData, setHighlightData] = useState<IHighlightData>({} as IHighlightData);

  const dateError = new Date(0);

  const { signOut, user } = useAuth();

  const theme = useTheme();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function getLastTransaction(collection: IDataListProps[], type: 'positive' | 'negative', orderByDate: 'first' | 'last'): Date {

    const collectionFilttered = collection
      .filter((transaction: IDataListProps) => transaction.type === type);

    console.log(collectionFilttered);
    if (collectionFilttered.length === 0) return dateError;

    const filterTransactions = collectionFilttered
      .map((transaction: IDataListProps) => new Date(transaction.date).getTime());

    const orderBy = orderByDate === 'last' ? Math.max.apply(Math, filterTransactions) : Math.min.apply(Math, filterTransactions);
    const finalDateTransaction = new Date(orderBy);

    return finalDateTransaction;
  }


  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: [] = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions
      .map((item: IDataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        };
      });

    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransaction(transactions, 'positive', 'last');
    const lastTransactionsEntriesFormatted = `${lastTransactionsEntries.getDate()} de ${lastTransactionsEntries.toLocaleString('pt-BR', { month: 'long' })}`;
    const lastTransactionsExpesives = getLastTransaction(transactions, 'negative', 'last');
    const lastTransactionsExpesivesFormatted = `${lastTransactionsExpesives.getDate()} de ${lastTransactionsExpesives.toLocaleString('pt-BR', { month: 'long' })}`;

    const entriesTotalAjust = entriesTotal ? entriesTotal : 0;
    const expensiveTotalAjust = expensiveTotal ? expensiveTotal : 0;
    const totalAjust = entriesTotal - expensiveTotal ? entriesTotal - expensiveTotal : 0;

    console.log(lastTransactionsEntries === dateError);

    setHighlightData({
      entries: {
        amount: entriesTotalAjust.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsEntries === dateError
          ? "Não há transações"
          : `Última entrada dia ${lastTransactionsEntriesFormatted}`
      },
      expensives: {
        amount: expensiveTotalAjust.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsExpesives === dateError
          ? "Não há transações"
          : `Última entrada dia ${lastTransactionsExpesivesFormatted}`
      },
      total: {
        amount: totalAjust.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionsExpesives === dateError && lastTransactionsEntries === dateError
          ? "Não há transações"
          : lastTransactionsExpesivesFormatted
      },
    });
    setIsLoading(false);
  }
  async function deleteItem(id: string) {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: ITransactionCardProps[] = response ? JSON.parse(response) : [];

    const newTransactionsList = responseFormatted.filter(item => item.id !== id);

    await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactionsList));

    await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
    setRefresh(true);
  }, []));

  useEffect(() => {
    loadTransactions();
    setRefresh(false);
  }, [refresh]);

  return (
    <Container>
      {
        isLoading ?
          <LoadingContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size='large'
            />
          </LoadingContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: user.photo }} />
                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <UserName>{user.name.split(" ")[0]}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton
                  onPress={signOut}
                >
                  <Icon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HighlightCards>

              <HighlightCard
                type='up'
                title='Entradas'
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
              />

              <HighlightCard
                type='down'
                title='Saídas'
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
              />

              <HighlightCard
                type='total'
                title='Total'
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
              />

            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>

                  <TransactionCard
                    deleteItem={(id: string) => deleteItem(id)}
                    data={item}
                  />}

              />

            </Transactions>
          </>
      }
    </Container>
  );
}

