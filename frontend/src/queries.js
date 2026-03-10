import { gql } from '@apollo/client';

export const FETCH_BOOKS_QUERY = gql`
  query GetBooks {
    allBooks {
      id
      title
      publishedDate
      author {
        name
      }
    }
  }
`;