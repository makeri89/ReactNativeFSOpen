import React from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  },
  tab: {
    padding: 10
  }
});

const AppBar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={TouchableWithoutFeedback}>
          <Text 
            color='menu' 
            fontSize='subheading' 
            style={styles.tab}
          >
            Repositories
          </Text>
        </Link>
        <Link to='/signin' component={TouchableWithoutFeedback}>
          <Text
            color='menu'
            fontSize='subheading'
            style={styles.tab}
          >
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBar;