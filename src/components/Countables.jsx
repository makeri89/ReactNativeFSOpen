import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './UIcomps/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const Countables = ({ item }) => {

  const counts = {
    stars: item.stargazersCount >= 1000 ? Math.round(item.stargazersCount / 100) / 10 + 'k' : item.stargazersCount,
    forks: item.forksCount >= 1000 ? Math.round(item.forksCount / 100) / 10 + 'k' : item.forksCount,
    reviews: item.reviewCount >= 1000 ? Math.round(item.reviewCount / 100) / 10 + 'k' : item.reviewCount,
    rating: item.ratingAverage >= 1000 ? Math.round(item.ratingAverage / 100) / 10 + 'k' : item.ratingAverage,
  };

  return (
    <View style={styles.container}>
      <Text textAlign='center' testID='stars'>{counts.stars}{'\n'}Stars</Text>
      <Text textAlign='center' testID='forks'>{counts.forks}{'\n'}Forks</Text>
      <Text textAlign='center' testID='reviews'>{counts.reviews}{'\n'}Reviews</Text>
      <Text textAlign='center' testID='rating'>{counts.rating}{'\n'}Rating</Text>
    </View>
  );
};

export default Countables;