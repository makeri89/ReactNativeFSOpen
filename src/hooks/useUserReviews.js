import { useQuery } from '@apollo/react-hooks';

import { GET_USER } from '../graphql/queries';

const useUserReviews = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  console.log(data);

  return {
    reviews: data ? data.authorizedUser.reviews : undefined
  };
};

export default useUserReviews;