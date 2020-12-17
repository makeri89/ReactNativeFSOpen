import React from 'react';

import SearchComponent from './Searchbar';
import OrderMenu from './OrderMenu';
import { View } from 'react-native';

const ListHeader = ({ setVariables, setFilter }) => {
  return (
    <View>
      <SearchComponent setFilter={setFilter} />
      <OrderMenu setVariables={setVariables} />
    </View>
  );
};

export default ListHeader;