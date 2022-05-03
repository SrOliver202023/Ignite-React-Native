import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import { ActivityIndicator } from 'react-native';

import {
  Container,
  Title
} from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  textColor?: string;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  textColor = theme.colors.shape,
  ...rest
}: ButtonProps) {
  return (
    <Container
      style={{
        backgroundColor: color ? color : theme.colors.main,
        opacity: (enabled === false || loading === true) ? .5 : 1
      }}
      onPress={onPress}
      enabled={enabled}
      {...rest}
    >
      {loading ? <ActivityIndicator color={theme.colors.shape} /> :
        <Title textColor={`${textColor}`}>{title}</Title>
      }
    </Container>
  );
}