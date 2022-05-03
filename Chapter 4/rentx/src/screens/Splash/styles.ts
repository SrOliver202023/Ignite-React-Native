import { View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  position:relative;
  flex:1;
  justify-content:center;
  align-items:center;

  background-color:${({ theme }) => theme.colors.header};
`;