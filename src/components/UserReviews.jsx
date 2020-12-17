import React from 'react';

import useUserReviews from '../hooks/useUserReviews';
import { useParams } from 'react-router-native';
import UserSingleReview from './UserSingleReview';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import ItemSeparator from './UIcomps/ItemSeparator';
import Text from './UIcomps/Text';
import { useMutation } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    padding: 10
  }
});

const UserReviews = () => {
  const { id } = useParams();
  console.log(id);

  const { reviews } = useUserReviews();

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const createAlert = (toDeleteId) => {
    Alert.alert(
      'Delete review?',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled')
        },
        {
          text: 'Delete',
          onPress: () => 
            deleteReview({
              variables: { id: toDeleteId },
              refetchQueries: [
                {
                  query: GET_USER,
                  variables: {
                    includeReviews: true
                  }
                }
              ]
            })
        }
      ],
      { cancelable: false }
    );
  };

  console.log(reviews);

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <UserSingleReview item={item} createAlert={createAlert} />
    );
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text fontSize='header' fontWeight='bold' style={styles.headerText}>
          Reviews you have given:
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList 
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default UserReviews;