import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton, GestureHandlerRootView } from 'react-native-gesture-handler';



import { FlatList, FlatListProps } from 'react-native';
import { IDataListProps } from '.';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color:${(props) => props.theme.colors.background};
  
`;

export const Header = styled(GestureHandlerRootView)`
  width:100%;
  height:${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content:center;
  align-items:flex-start;
  flex-direction:row;
`;

export const UserWrapper = styled(GestureHandlerRootView)`
  width:100%;
  padding:0 24px;
  
  flex-direction:row;
  justify-content:space-between;
  margin-top:${Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(28) : RFValue(48)}px;
`;

export const UserInfo = styled(GestureHandlerRootView)`
  flex-direction:row;
`;
export const Photo = styled.Image`
  width:${RFValue(62)}px;
  height:${RFValue(62)}px;

  border-radius:10px;
`;
export const User = styled(GestureHandlerRootView)`
  margin-left:17px;
`;
export const UserGreeting = styled.Text`
  color:${({ theme }) => theme.colors.shape};

  font-size:${RFValue(18)}px;
  font-family:${({ theme }) => theme.fonts.regular};
`;
export const UserName = styled.Text`
  color:${({ theme }) => theme.colors.shape};

  font-size:${RFValue(18)}px;
  font-family:${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)`

`;

export const Icon = styled(Feather)`
  color:${({ theme }) => theme.colors.secondary};
  font-size:${RFValue(30)}px;

`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24, paddingRight: 20 }
})`
  width:100%;
  position:absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled(GestureHandlerRootView)`
  flex:1%;
  padding:0 24px;
  margin-top:${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size:${RFValue(18)}px;
  font-family:${({ theme }) => theme.fonts.medium};
  margin-bottom:16px;
`;

export const TransactionsList = styled(
  FlatList as new (data: FlatListProps<IDataListProps>) => FlatList<IDataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``;