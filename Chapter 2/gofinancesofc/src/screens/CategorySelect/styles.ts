import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { ViewProps } from 'react-native';
import theme from '../../global/styles/theme';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

interface CategoriesProps {
  isActive: boolean;
  checkNumber: number;
}

export const Container = styled(GestureHandlerRootView)`
  flex:1;
  background-color:${({ theme }) => theme.colors.background};
`;

export const Header = styled(GestureHandlerRootView)`
  width:100%;
  height:${RFValue(113)}px;

  background-color:${({ theme }) => theme.colors.primary};
  align-items:center;
  justify-content:flex-end;
  padding-bottom:19px;
`;
export const Title = styled.Text`
  font-family:${({ theme }) => theme.fonts.regular};
  color:${({ theme }) => theme.colors.background};
  
  font-size:${RFValue(18)}px;
`;

export const Category = styled(RectButton) <CategoriesProps>`
  width:100%;
  padding:${RFValue(15)}px;

  flex-direction:row;
  align-items:center;

  /* background-color:${({ theme, checkNumber }) => checkNumber % 2 === 1 ? theme.colors.shape : theme.colors.background}; */

  background-color:${({ theme, isActive, checkNumber }) =>
    isActive ? theme.colors.secondary_light : checkNumber % 2 === 1 ? theme.colors.shape : theme.colors.background
  };

`;
export const Icon = styled(Feather)`
  font-size:${RFValue(20)}px;
  margin-right:16px;
`;
export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

`;

export const Separator = styled.View`
  width:100%;
  height:1px;
  /* background-color:${({ theme }) => theme.colors.primary}; */
`;

export const Footer = styled(GestureHandlerRootView)`
  width:100%;
  padding:24px;
`;
