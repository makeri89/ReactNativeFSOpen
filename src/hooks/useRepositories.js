import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, filterValue, first }) => {

  const searchKeyword = filterValue;

  const repos = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword, first }
  });

  const { loading, data, fetchMore, ...result } = repos;

  const handleFetchMore = () => {
    const canFetchMore = 
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { orderBy, orderDirection, searchKeyword }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return { 
    repositories: data ? data.repositories : undefined, 
    loading, 
    fetchMore: handleFetchMore, 
    ...result 
  };

};

export default useRepositories;