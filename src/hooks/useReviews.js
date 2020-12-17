import { useQuery } from '@apollo/react-hooks';

import { GET_REVIEWS } from '../graphql/queries';

const useReviews = ({ id, first }) => {

  const reviews = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first },
  });

  const { loading, data, fetchMore, ...result } = reviews;

  const handleFetchMore = () => {
    const canFetchMore = 
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    console.log(canFetchMore);

    if (!canFetchMore) {
      return;
    }

    console.log(data.repository.reviews.pageInfo.endCursor);
    console.log(id);

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id, 
        first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          }
          
        };

        return nextResult;
      },
    });
  };

  return {
    reviews: data ? data.repository.reviews : undefined,
    repository: data ? data.repository : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useReviews;