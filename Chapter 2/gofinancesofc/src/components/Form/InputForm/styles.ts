import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Container = styled(GestureHandlerRootView)`
  width:100%;
`;

export const ContainerError = styled(GestureHandlerRootView)`
  width:auto;
  `;

export const Error = styled.Text`
  font-size:${RFValue(14)}px;
  font-family:${({ theme }) => theme.fonts.regular};
  background-color:${({ theme }) => theme.colors.attention};
  color:${({ theme }) => theme.colors.shape};
  margin-bottom:4px;
  align-self:flex-start;
  padding:4px;
  border-radius:3px;
`;