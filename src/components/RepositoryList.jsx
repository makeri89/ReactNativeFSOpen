import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';
import ListHeader from './ListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    marginBottom: 30
  }
});

const ItemSeparator = () => <View style={styles.separator} />;
// const history = useHistory();
const renderItem = ({ item }) => {
  return(
    <RepositoryItem item={item}/>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setVariables, setFilter } = this.props;
    return (
      <ListHeader
        setVariables={setVariables}
        setFilter={setFilter}
      />
    );
  }  
    
  render() {
    const { repositories, onEndReach } = this.props;

    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        style={styles.list}
        onEndReached={onEndReach}
      />
    );
  }
}

const RepositoryList = () => {
  const [variables, setVariables] = useState('Latest');
  const [filter, setFilter] = useState('');
  const [filterValue] = useDebounce(filter, 500);

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  switch(variables) {
    case 'Latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'Highest rated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'Lowest rated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
  }

  const { repositories, fetchMore } = useRepositories({ 
    orderBy, 
    orderDirection, 
    filterValue,
    first: 8
   });

  const onEndReach = () => {
    fetchMore();
  };

  return (
  <View>
    <RepositoryListContainer 
      repositories={repositories}
      setVariables={setVariables}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  </View>);
};

export default RepositoryList;