import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { StatusBar } from 'react-native';

import AppLoading from 'expo-app-loading';

import { RefreshProvider, RefreshContext } from './src/providers/RefreshTransactions';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <RefreshProvider value={{ toRefresh: false }}>

      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle='light-content' />

          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>

    </RefreshProvider>
  );
}
