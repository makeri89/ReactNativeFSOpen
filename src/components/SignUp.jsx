import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

import FormikTextInput from './UIcomps/FormikTextInput';
import Button from './UIcomps/Button';
import { Formik } from 'formik';
import Text from './UIcomps/Text';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10
  },
  header: {
    textAlign: 'center',
    paddingTop: 10
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text fontSize='header' fontWeight='bold' style={styles.header}>Sign up</Text>
      <FormikTextInput name='username' placeholder='username' />
      <FormikTextInput name='password' placeholder='password' secureTextEntry />
      <FormikTextInput name='passwordConfirm' placeholder='passwordConfirm' secureTextEntry />
      <Button text='Sign Up' onPress={onSubmit} />
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least one character long')
    .max(30, 'Username cannot be longer than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least three characters long')
    .max(50, 'Password cannot be longer than 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirm is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      console.log(data);
      const { signedInData } = await signIn({ username, password });
      console.log(signedInData);
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;