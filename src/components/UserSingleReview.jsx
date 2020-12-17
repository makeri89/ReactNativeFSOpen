import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import { format, parseISO } from 'date-fns';

import Button from './UIcomps/Button';
import Text from './UIcomps/Text';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -10
  },
  delete: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden'
  },
  dataContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
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
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10
  }
});

const UserSingleReview = ({ item, createAlert }) => {
  const Actions = ({ url, reviewId }) => {
    return (
      <View style={styles.buttonContainer}>
        <Link to={url} component={Button} text='View repository'>
          <Text>View repository</Text>
        </Link>
        <TouchableWithoutFeedback>
          <Text color='delete' style={styles.delete} onPress={() => createAlert(reviewId)}>Delete review</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const ReviewData = ({ item }) => {
    const date = format(parseISO(item.createdAt), 'dd.MM.yyyy');
    console.log('item', item);
    return (
      <View style={styles.dataContainer}>
        <Text color='primary' style={styles.rating}>{item.rating}</Text>
        <View style={styles.info}>
          <Text fontSize='subheading' fontWeight='bold'>{item.repository.fullName}</Text>
          <Text color='textSecondary'>{date}</Text>
          <Text>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ReviewData item={item} />
      <Actions url={item.repository.id} reviewId={item.id} />
    </View>
  );
};

export default UserSingleReview;