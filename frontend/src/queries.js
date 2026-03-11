import { gql } from "@apollo/client";

export const FETCH_BOOKS_QUERY = gql`
query GetBooks($page:Int,$limit:Int){

  allBooks(page:$page,limit:$limit){

    id
    title
    publishedDate

    author{
      name
    }

  }

}
`;