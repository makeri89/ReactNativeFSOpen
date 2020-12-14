import { useQuery } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const repos = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const { loading, data, networkStatus, refetch } = repos;

  useEffect(() => {
    if (networkStatus === 7) {
      setRepositories(data.repositories);
    }
  }, [repos]);

  return { repositories, loading, refetch };

};

export default useRepositories;