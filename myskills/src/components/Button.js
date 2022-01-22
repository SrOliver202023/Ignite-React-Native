import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

export function Button({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={.7}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        Button
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