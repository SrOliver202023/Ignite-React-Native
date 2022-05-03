import React from 'react';
import { Alert } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function ConfirmButton({
  title,
  ...rest
}: Props) {
  const iAlert = () => Alert.alert(`OK!`);
  return (
    <Container
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}