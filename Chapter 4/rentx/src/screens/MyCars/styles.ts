import { Text, View, ScrollView, FlatList, FlatListProps } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import { CarProps } from '.';
import { CarDTO } from '../../dtos/car';

export const Container = styled(View)`
  flex:1;
  align-items:center;
  background-color:${({ theme }) => theme.colors.background_primary};
  width:100%;
`;
export const Header = styled(View)`
  width:100%;
  height:${RFValue(300)}px;

  background-color:${({ theme }) => theme.colors.header};

  justify-content:center;
  padding:${RFValue(25)}px ${RFValue(25)}px;
  padding-top:${getStatusBarHeight()}px;
`;

export const Title = styled(Text)`
  color:${({ theme }) => theme.colors.shape};
  font-family:${({ theme }) => theme.fonts.secondary_600};
  font-size:${RFValue(30)}px;

  margin-top:39px;
`;

export const SubTitle = styled(Text)`
  color:${({ theme }) => theme.colors.shape};
  font-family:${({ theme }) => theme.fonts.secondary_600};
  font-size:${RFValue(15)}px;

  margin-top:18px;
`;
export const Content = styled(View)`
  flex:1;
  width:100%;
  padding:0 16px;
`;

export const Appointments = styled(View)`
  width:100%;

  flex-direction:row;
  justify-content:space-between;
  align-items:center;

  padding:24px 0;
`;

export const AppointmentsTitle = styled(Text)`
  color:${({ theme }) => theme.colors.text};
  font-family:${({ theme }) => theme.fonts.primary_400};
  font-size:${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled(Text)`
  color:${({ theme }) => theme.colors.title};
  font-family:${({ theme }) => theme.fonts.primary_500};
  font-size:${RFValue(15)}px;
`;

export const CarsList = styled(FlatList).attrs({
  showVerticalScrollIndicator: false
})`` as React.ElementType as new (item: FlatListProps<CarProps>) => FlatList<CarProps>;

export const CarWrapper = styled(View)`
  margin-bottom:16px;
`;
export const CarFooter = styled(View)`
  width:100%;
  padding:12px;

  margin-top:-10px;

  flex-direction:row;
  align-items:center; 
  justify-content:space-between;

  background-color:${({ theme }) => theme.colors.background_secondary};
`;
export const CarFooterTitle = styled(Text)`
  color:${({ theme }) => theme.colors.text_detail};
  font-family:${({ theme }) => theme.fonts.secondary_500};
  font-size:${RFValue(10)}px;
  
`;

export const CarFooterPeriod = styled(View)`
  flex-direction:row;
  align-items:center;
`;

export const CarFooterDate = styled(Text)`
  color:${({ theme }) => theme.colors.title};
  font-family:${({ theme }) => theme.fonts.secondary_400};
  font-size:${RFValue(10)}px;
`;