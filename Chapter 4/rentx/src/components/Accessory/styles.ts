import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

export const Container = styled(View)`
  width:${RFValue(109 - 5)}px;
  height:${RFValue(92 - 5)}px;
  
  justify-content:center;
  align-items:center;

  background-color:${({ theme }) => theme.colors.background_primary};

  margin-bottom:8px;
`;

export const Name = styled(Text)`
  font-family:${({ theme }) => theme.fonts.primary_500};
  color:${({ theme }) => theme.colors.text};
  font-size:${RFValue(13)}px;
`;