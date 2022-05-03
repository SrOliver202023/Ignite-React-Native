import React from 'react';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps, View, Text } from 'react-native';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { CarDTO } from '../../dtos/car';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

export const Container = styled(View)`
  flex:1;
  background-color:${theme.colors.background_primary};
`;

export const Header = styled(View)`
  width:100%;
  height:113px;
  background-color:${theme.colors.header};

  justify-content:flex-end;
  padding:32px 24px;
`;

export const HeaderContent = styled(View)`
  flex-direction:row;
  justify-content:space-between;
`;

export const TotalCars = styled(Text)`
  font-size:${RFValue(15)}px;
  font-family:${theme.fonts.primary_400};
  color:${theme.colors.text};
`;

export const CarsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})`` as React.ElementType as new (item: FlatListProps<CarDTO>) => FlatList<CarDTO>;

export const CarsEmpty = styled(View)`
  margin-top:${RFPercentage(38)}px;
`;

export const Title = styled(Text)`
  text-align:center;
  color:${theme.colors.text};
  font-size:${RFValue(20)}px;

  font-family:${theme.fonts.secondary_500};
`;

export const MyCarsButton = styled(RectButton)`
  width:60px;
  height:60px;

  border-radius:30px;

  justify-content:center; 
  align-items:center;

  position:absolute;

  bottom:13px;
  right:22px;
  background-color:${theme.colors.main};
`as React.ComponentType as new <RectButtonProps>() => RectButton;