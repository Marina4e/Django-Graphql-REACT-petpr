import { gql } from '@apollo/client/react';

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook(
    $title: String!
    $authorId: Int!
    $publishedDate: Date!
    $isbn: String!
  ) {
    createBook(
      title: $title
      authorId: $authorId
      publishedDate: $publishedDate
      isbn: $isbn
    ) {
      book {
        id
        title
      }
    }
  }
`;
