import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,

} from './styles';

export function Profile({ navigation }: { navigation: NavigationProp<any>; }) {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const theme = useTheme();

  function handleBack() {

  }
  function handleSignOut() {

  }
  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }
  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name='power' size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo source={{ uri: "https://github.com/sroliver202023.png" }} />
          <PhotoButton onPress={() => {}}>
            <Feather
              name='camera'
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>

      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >

            <OptionTitle active={option === 'dataEdit'}>
              Dados
            </OptionTitle>
          </Option>

          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >

            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}