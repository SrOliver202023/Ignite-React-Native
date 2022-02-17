import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface Props extends RectButtonProperties {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

import {
  Button,
  ImageContainer,
  Text
} from './styles';

export function SignInSocialButton({
  title,
  svg: Svg,
  onPress,
  ...rest
}: Props) {
  return (
    <Button
      onPress={onPress}
      {...rest}
    >
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}