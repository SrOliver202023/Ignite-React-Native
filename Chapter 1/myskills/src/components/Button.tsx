import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, TouchableOpacityProps
} from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
  name: string;
}

export function Button({ name, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={.7}
      {...rest}
    >
      <Text style={styles.buttonText}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A370F7',
    padding: 15,
    bordeRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 7
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});