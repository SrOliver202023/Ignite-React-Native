import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

export const Container = styled(View)`
  flex:1;
  background-color:${({ theme }) => theme.colors.header};
  padding-top:${RFValue(50)}px;
`;

export const Content = styled(View)`
  flex:1;
  justify-content:center;
  align-items:center;

  padding-bottom:${RFValue(100)}px;
`;
export const Title = styled(Text)`
  font-size:${RFValue(30)}px;
  color:${({ theme }) => theme.colors.shape};
  font-family:${({ theme }) => theme.fonts.secondary_500};

  margin-top:${RFValue(20)}px;
`;
export const Message = styled(Text)`
  font-size:${RFValue(15)}px;
  color:${({ theme }) => theme.colors.text_detail};
  font-family:${({ theme }) => theme.fonts.primary_400};
  line-height:${RFValue(25)}px;
  text-align:center;

  margin-top:16px;
`;

export const Footer = styled(GestureHandlerRootView)`
  width:100%;
  flex:1;
  justify-content:center;
  align-items:center;
  padding-bottom:${20}px;
`;