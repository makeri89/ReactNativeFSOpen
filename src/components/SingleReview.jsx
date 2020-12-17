import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format, parseISO } from 'date-fns';

import Text from './UIcomps/Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10
  },
  rating: {
    borderColor: '#0366d6',
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 10,
    paddingTop: 10,
    textAlign: 'center'
  },
  info: {
    flexShrink: 1
  }
});

const SingleReview = ({ item }) => {

  const date = format(parseISO(item.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.container}>
      <Text color='primary' style={styles.rating}>{item.rating}</Text>
      <View style={styles.info}>
        <Text fontSize='subheading' fontWeight='bold'>{item.user.username}</Text>
        <Text color='textSecondary'>{date}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default SingleReview;