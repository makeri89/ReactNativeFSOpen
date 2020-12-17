import { gql } from 'apollo-boost';

export const REPOSITORY_INFO = gql`
  fragment repositoryInfo on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
  }
`;

export const REVIEW_INFO = gql`
  fragment reviewInfo on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;