import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import Text from './UIcomps/Text';
import Countables from './Countables';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5
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
    overflow: 'hidden',
    marginVertical: 10
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
    <Link to={`/${item.id}`} component={TouchableOpacity}>
      <View style={styles.item}>
        <View style={styles.top}>
          <Image
            style={styles.avatar}
            source={{
            uri: item.ownerAvatarUrl
            }} 
          />
          <View style={styles.info}>
            <Text fontSize='header' fontWeight='bold' testID='fullname'>{item.fullName}</Text>
            <Text color='textSecondary' fontSize='subheading' style={styles.info} testID='description'>{item.description}</Text>
            <Text color='button' style={styles.tag} testID='language'>{item.language}</Text>
          </View>
        </View>
        <Countables item={item} />
      </View>
    </Link>
  );
};

export default RepositoryItem;