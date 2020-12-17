import React from 'react';
import { useParams } from 'react-router-native';
import { View, TouchableWithoutFeedback, StyleSheet, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY, GET_REVIEWS } from '../graphql/queries';

import RepositoryItem from './RepositoryItem';
import Text from './UIcomps/Text';
import SingleReview from './SingleReview';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  top: {
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 5
  },
  reviewheader: {
    textAlign: 'center'
  },
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {

  const { id } = useParams();

  const { repository, reviews, fetchMore } = useReviews({
    id, first: 8
  });

  const onEndReach = () => {
    console.log('hello');
    fetchMore();
  };

  const openGithub = (url) => {
    Linking.openURL(url);
  };

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const RepositoryInfo = () => {
    return (
      
      <View style={styles.top}>
        {repository && 
        <RepositoryItem item={repository} />
        }
        <TouchableWithoutFeedback onPress={() => openGithub(repository.url)}>
          <Text color='language' textAlign='center' style={styles.button}>Open in Github</Text>
        </TouchableWithoutFeedback>
        <Text fontSize='subheading' fontWeight='bold' style={styles.reviewheader}>Reviews</Text>

        </View>
    );
  };

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
          ListHeaderComponent={() => <RepositoryInfo />}
          stickyHeaderIndices={[0]}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
    </View>
  );
};

export default SingleRepository;