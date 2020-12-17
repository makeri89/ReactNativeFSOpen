import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './UIcomps/Text';
import FormikTextInput from './UIcomps/FormikTextInput';

import useReview from '../hooks/useReview';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: ''
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden',
  },
  header: {
    paddingTop: 10,
    textAlign: 'center',
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository's owner is required"),
  repositoryName: yup
    .string()
    .required("Repository's name is required"),
  rating: yup
    .number()
    .integer('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Maximum rating is 100')
    .required('A rating is required'),
  text: yup
    .string()
});

const FormComponents = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text fontSize='header' fontWeight='bold' style={styles.header}>Create a review</Text>
      <FormikTextInput name='repositoryName' placeholder="Repository name" />
      <FormikTextInput name='ownerName' placeholder="Owner's name" />
      <FormikTextInput name='rating' placeholder='Rating' />
      <FormikTextInput name='text' placeholder="Review text" multiline />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text color='language' style={styles.button}>Submit review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewForm = () => {
  const history = useHistory();
  const [reviewRepo] = useReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    const ratingToNumber = Number(rating);
    
    try {
      const { data } = await reviewRepo({ repositoryName, ownerName, rating: ratingToNumber, text });
      console.log(data);
      history.push(`/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <FormComponents onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;