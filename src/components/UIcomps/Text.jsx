import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    padding: 2
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorMenu: {
    color: theme.colors.menu
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.menu,
  },
  centered: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.menu,
  },
  fontSizeHeader: {
    fontSize: theme.fontSizes.header,
  },
  deleteButton: {
    backgroundColor: 'red',
    color: theme.colors.menu
  }

});

const Text = ({ textAlign, color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'menu' && styles.colorMenu,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'header' && styles.fontSizeHeader,
    fontWeight === 'bold' && styles.fontWeightBold,
    color === 'language' && styles.languageTag,
    textAlign === 'center' && styles.centered,
    color === 'button' && styles.button,
    color === 'delete' && styles.deleteButton,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;