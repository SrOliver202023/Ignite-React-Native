import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView, Text, View } from "react-native";
import styled from 'styled-components';

export const Container = styled(View)`
  flex:1;
  background-color:${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled(GestureHandlerRootView)`
  flex-direction:row;
  justify-content:space-between;
  align-items:flex-start;

  margin-top:${getStatusBarHeight() + 18}px;
  margin-left:24px;
`;

export const CarImages = styled(View)`
  background-color:${({ theme }) => theme.colors.background_secondary};
  margin-top:10px;
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false
})``;


export const Details = styled(View)`
  width:100%;

  flex-direction:row;
  align-items:center;
  justify-content:space-between;

  margin-top:18px;
`;

export const Description = styled(View)``;

export const Brand = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.text_detail};
  font-size:${RFValue(10)}px;

  text-transform:uppercase;
`;

export const Name = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.title};
  font-size:${RFValue(25)}px;

`;
export const Rent = styled(View)``;

export const Period = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.text_detail};
  font-size:${RFValue(10)}px;

  text-transform:uppercase;
`;

export const Price = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.main};
  font-size:${RFValue(25)}px;
`;

export const About = styled(Text)`
  font-family:${({ theme }) => theme.fonts.primary_400};
  color:${({ theme }) => theme.colors.text};
  font-size:${RFValue(15)}px;

  margin-top:23px;
  line-height:${RFValue(25)}px;
`;

export const Accessories = styled(View)`
  width:100%;
  flex-direction:row;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;

  margin-top:16px;
`;

export const RentalPeriod = styled(View)`
  width:100%;

  flex-direction:row;
  justify-content:space-between;
  align-items:center;

  padding:8px;
  margin-top:40px;

  border-bottom-width:1px;
  border-bottom-color:${({ theme }) => theme.colors.line};
  padding-bottom:16px;
`;
export const CalendarIcon = styled(View)`
  width:48px;
  height:48px;

  justify-content:center;
  align-items:center;
  background-color:${({ theme }) => theme.colors.main};
`;

export const DateInfo = styled(View)`
`;
export const DateTitle = styled(Text)`
  color:${({ theme }) => theme.colors.text};
`;
export const DateValue = styled(Text)`
  font-family:${({ theme }) => theme.fonts.primary_500};
  color:${({ theme }) => theme.colors.title};
  font-size:${RFValue(15)}px;
`;

export const RentalPrice = styled(View)`
  width:100%;
  padding:8px;

`;
export const RentalPriceLabel = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.text_detail};
  font-size:${RFValue(10)}px;
`;
export const RentalPriceDetails = styled(View)`
  flex-direction:row;
  justify-content:space-between;

  margin-top:8px;
`;
export const RentalPriceQuota = styled(Text)`
  font-family:${({ theme }) => theme.fonts.primary_500};
  color:${({ theme }) => theme.colors.title};
  font-size:${RFValue(15)}px;
`;
export const RentalPriceTotal = styled(Text)`
  font-family:${({ theme }) => theme.fonts.secondary_500};
  color:${({ theme }) => theme.colors.success};
  font-size:${RFValue(24)}px;
`;

export const Footer = styled(GestureHandlerRootView)`
  width:100%;
  background-color:${({ theme }) => theme.colors.background_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
