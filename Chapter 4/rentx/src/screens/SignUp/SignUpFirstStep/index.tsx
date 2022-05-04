import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep({ navigation }: { navigation: NavigationProp<any>; }) {
  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'}
            Conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
            />
          </Form>
          <Button
            title='Próximo'
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}