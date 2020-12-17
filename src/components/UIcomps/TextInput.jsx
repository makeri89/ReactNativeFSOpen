import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  onError: {
    borderColor: '#d73a4a',
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = !error ? [style] : styles.onError;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;