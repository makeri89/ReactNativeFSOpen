import React from 'react';
import { useHistory } from 'react-router-native';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './UIcomps/Text';
import FormikTextInput from './UIcomps/FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10
  },
  actionbutton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden'
  },
  header: {
    textAlign: 'center',
    paddingTop: 10
  }
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <Text fontSize='header' fontWeight='bold' style={styles.header}>Sign in</Text>
      <FormikTextInput name='username' placeholder='username' />
      <FormikTextInput name='password' placeholder='password' secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} testID='submitButton'>
        <Text color='language' style={styles.actionbutton}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>  
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least three characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least three characters long')
    .required('Password is required')
});

export const SignInContainer = ({ onSubmit, validationSchema }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [singIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const { data } = await singIn({ username, password });
      console.log('data', data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;