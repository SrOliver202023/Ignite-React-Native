import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC<any> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Input Component', () => {
  it('should have a specific border color when active property is true', () => {
    const { getByTestId } = render(
      <Input
        testID="email-input"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />
      ,
      {
        wrapper: Providers
      }
    );

    const emailInput = getByTestId('email-input');

    expect(emailInput.props.style[0].borderColor)
      .toEqual(theme.colors.attention);

    expect(emailInput.props.style[0].borderWidth)
      .toEqual(3);
  });
});