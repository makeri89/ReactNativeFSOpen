import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (e) => {
      console.error(e);
    }
  });

  const reviewRepo = async ({ repositoryName, ownerName,  rating, text }) => {
    
    const review = {  repositoryName, ownerName, rating, text };

    const data = await mutate({
      variables: review
    });

    return data;
  };

  return [reviewRepo, result];

};

export default useReview;