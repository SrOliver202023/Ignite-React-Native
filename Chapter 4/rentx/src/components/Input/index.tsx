import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({
  iconName,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    const valueTrim = value?.trim();
    setIsFocused(false);
    setIsFilled(!!valueTrim);
  }

  return (
    <Container>
      <IconContainer
        isFocused={isFocused}
      >
        <Feather
          name={iconName}
          size={24}
          color={isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}