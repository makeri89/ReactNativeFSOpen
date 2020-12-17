import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchComponent = ({ setFilter }) => {
  const [search, setSearch] = useState('');

  const onChangeSearch = query => {
    setFilter(query);
    setSearch(query);
  };

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChangeSearch}
      value={search}
    />
  );
};

export default SearchComponent;