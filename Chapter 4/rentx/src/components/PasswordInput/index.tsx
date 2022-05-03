import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton
} from './styles';

import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    const valueTrim = value?.trim();
    setIsFocused(false);
    setIsFilled(!!valueTrim);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
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

        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <ChangePasswordVisibilityButton
        onPress={handlePasswordVisibilityChange}
      >
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>

    </Container>
  );
}