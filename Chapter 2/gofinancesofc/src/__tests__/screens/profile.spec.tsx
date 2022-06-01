import React from 'react';

import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

import { ReactTestProps } from '../../@types/test/test';


describe('Screen Profile', () => {
  it('Should have placeholder correctly in user input name', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });


  it('Should be load user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');


    expect(inputName.props.value).toEqual('Emmerson');
    expect(inputSurname.props.value).toEqual('Oliveira');

  });



  it('Should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle: ReactTestProps = getByTestId('text-title');


    expect(textTitle.props.children).toContain('Perfil');
  });


});