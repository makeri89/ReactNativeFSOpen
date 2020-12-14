import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';

import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error);
    }
  });

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    const data =  await mutate({
      variables: credentials
    });

    await authStorage.setAccessToken(data.data.authorize.accessToken);
    apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;