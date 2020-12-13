import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Text from './Text';
import Countables from './Countables';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10
  },
  tag: {
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
    overflow: 'hidden'
  },
  top: {
    flexDirection: 'row',
  },
  info: {
    flexShrink: 1,
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.top}>
        <Image
          style={styles.avatar}
          source={{
          uri: item.ownerAvatarUrl
          }} 
        />
        <View style={styles.info}>
          <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary' style={styles.info}>{item.description}</Text>
          <Text color='language' style={styles.tag}>{item.language}</Text>
        </View>
      </View>
      <Countables item={item} />
    </View>
  );
};

export default RepositoryItem;