import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import React from 'react';

interface ButtonsProps extends RectButtonProperties {
  color?: string;
}

export const Container = styled(RectButton) <ButtonsProps>`
  width:100%;

  padding:19px;
  align-items:center;
  justify-content:center;
  background-color:${({ color, theme }) => color ? color : theme.colors.main};
` as React.ElementType as new <ButtonsProps>() => RectButton;

export const Title = styled(Text)`
  font-family:${({ theme }) => theme.fonts.primary_500};
  font-size:${RFValue(15)}px;
  color:${({ theme }) => theme.colors.shape};
`;