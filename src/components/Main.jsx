import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
        <Route path='/review' exact>
          <ReviewForm />
        </Route>
        <Route path='/reviews' exact>
          <UserReviews />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/:id' exact>
          <SingleRepository />
        </Route>
        
        <Redirect to='/' />
      </Switch>
    </SafeAreaView>
  );
};

export default Main;