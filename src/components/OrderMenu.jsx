import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Select, Option } from 'react-native-chooser';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    margin: 10,
    height: 150,
    borderRadius: 10,
    borderColor: '#0366d6',
    borderWidth: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  backdrop: {
    backgroundColor: 'rgba(225, 228, 232, 0.7)'
  },
  box: {
    margin: 10,
    borderRadius: 5,
    borderColor: '#24292e',
    width: width - 20
  },
  text: {
    color: '#24292e'
  }

});

const OrderMenu = ({ setVariables }) => {
  return (
    <View>
      <Select
        onSelect={(value) => setVariables(value)}
        defaultText='Order by:'
        transparent={true}
        optionListStyle={styles.menu}
        indicator='down'
        backdropStyle={styles.backdrop}
        style={styles.box}
        textStyle={styles.text}
        indicatorColor='#24292e'
      >
        <Option value='Latest'>By latest review</Option>
        <Option value='Highest rated'>Highest rated</Option>
        <Option value='Lowest rated'>Lowest rated</Option>
      </Select>
    </View>
  );
};

export default OrderMenu;