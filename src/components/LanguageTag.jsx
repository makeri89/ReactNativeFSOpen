import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.menu,
    padding: 10
  }
});

const LanguageTag = ({ color, style, ...props }) => {
  const tagStyle = [
    styles.text,
    color === 'languageTag' && styles.LanguageTag,
    style
  ];

  return <NativeText style={tagStyle} {...props} />;
};

export default LanguageTag;