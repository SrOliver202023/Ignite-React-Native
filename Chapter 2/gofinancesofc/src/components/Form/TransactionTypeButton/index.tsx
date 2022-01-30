import React from "react";

import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Button,
  Icon,
  Title
} from "./styles";

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
};

interface Props extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: Props) {
  return (
    <Container
      type={type}
      isActive={isActive}
    >

      <Button
        type={type}
        isActive={isActive}
        {...rest}
      >
        <Icon
          type={type}
          name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}