import { NavigationProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { api } from '../../../services/api';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';


interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string,
  };

}

export function SignUpSecondStep({ navigation }: { navigation: NavigationProp<any>; }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Opa', 'Insira uma senha e sua confirmação.');
    }
    if (password !== passwordConfirm) {
      return Alert.alert('Opa', 'As senhas devem ser iguais.');
    }

    const { name, driverLicense, email } = user;
    await api.post('/users', {
      name,
      email,
      driver_license: driverLicense,
      password
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'SignIn'
      });
    }).catch((error) => {
      console.log(error);
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
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
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>
          <Button
            title='Próximo'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}