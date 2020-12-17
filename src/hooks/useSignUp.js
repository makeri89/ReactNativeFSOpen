import { useMutation } from '@apollo/react-hooks';

import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, {
    onError: (e) => {
      console.error(e);
    }
  });

  const signUp = async ({ username, password }) => {
    const data = await mutate({
      variables: { username, password }
    });

    return data;
  };

  return [signUp, result];
};

export default useSignUp;