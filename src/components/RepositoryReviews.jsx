import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { GET_REVIEWS } from '../graphql/queries';

import SingleReview from './SingleReview';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#e1e4e8'
  },
   reviews: {
     flexShrink: 1
   }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryReviews = ({ id }) => {
  const reviews = useQuery(GET_REVIEWS, {
    variables: { id }
  });

  if (reviews.loading) {
    return <Text>Loading reviews...</Text>;
  }

  console.log('reviews', reviews.data.repository.reviews);

  const reviewNodes = reviews
    ? reviews.data.repository.reviews.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <SingleReview item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.reviews}
      />
    </View>
  );
};

export default RepositoryReviews;