import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
  Container
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends BorderlessButtonProps {
  color?: string;
  size?: number;
}

export function BackButton({ color, size = 28, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      style={{ width: RFValue(size), height: RFValue(size) }}>
      <MaterialIcons
        name='chevron-left'
        size={RFValue(size)}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}