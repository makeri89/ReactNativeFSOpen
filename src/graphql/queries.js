import { gql } from 'apollo-boost';

import { REPOSITORY_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $after: String,
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first
    ) {
      edges {
        node {
          ...repositoryInfo
        }
        cursor
      }
      pageInfo {
        hasNextPage
        totalCount
        startCursor
        endCursor
      }
    }
  }
  ${REPOSITORY_INFO}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      ...repositoryInfo
    }
  }
  ${REPOSITORY_INFO}
`;

export const GET_REVIEWS = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repositoryInfo
      reviews(first: $first, after: $after) {
        edges { 
          node {
            ...reviewInfo
          }
          cursor
        }

        pageInfo {
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
`;

export const GET_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewInfo
            repository {
              ...repositoryInfo
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }
  ${REVIEW_INFO}
  ${REPOSITORY_INFO}
`;