import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden'
  }
});

const Button = ({ text, ...props }) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <Text color='button' style={styles.button}>{text}</Text>
    </TouchableWithoutFeedback>
  );
};

export default Button;