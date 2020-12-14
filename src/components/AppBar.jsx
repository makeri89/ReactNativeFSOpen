import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const isUserLoggedIn = useQuery(GET_USER);

  let loggedIn = false;
  if (!isUserLoggedIn.loading) {
    loggedIn = isUserLoggedIn.data.authorizedUser ? true : false;
  } 

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
        {!loggedIn ?
          <Link to='/signin' component={TouchableWithoutFeedback}>
            <Text
              color='menu'
              fontSize='subheading'
              style={styles.tab}
            >
              Sign in
            </Text>
          </Link>
        :
          <TouchableWithoutFeedback onPress={signOut}>
            <Text
              color='menu'
              fontSize='subheading'
              style={styles.tab}
            >
              Sign out
            </Text>
          </TouchableWithoutFeedback>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBar;