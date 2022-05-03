import React from 'react';
import { TextInput, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components';

interface Props {
  isFocused: boolean;
}

export const Container = styled(View)`
  flex-direction:row;

`;

export const IconContainer = styled(View) <Props>`
  height:56px;
  width:55px;
  justify-content:center;
  align-items:center;

  margin-right:2px;
  background-color:${({ theme }) => theme.colors.background_secondary};

  margin-bottom:${RFValue(8)}px;
  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width:2px;
    border-bottom-color:${theme.colors.main};

  `}
`;

export const InputText = styled(TextInput) <Props>`
  flex:1;

  background-color:${({ theme }) => theme.colors.background_secondary};
  color:${({ theme }) => theme.colors.text};
  font-family:${({ theme }) => theme.fonts.primary_400};
  font-size:${RFValue(15)}px;

  padding:0 23px;

  margin-bottom:${RFValue(8)}px;
  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width:2px;
    border-bottom-color:${theme.colors.main};

  `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`

  background-color:${({ theme }) => theme.colors.background_secondary};

`  as React.ElementType as new <BorderlessButtonProps>() => BorderlessButton;;;;;;