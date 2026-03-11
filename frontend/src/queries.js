import { gql } from "@apollo/client";

export const FETCH_BOOKS_QUERY = gql`

query GetBooks(
$page:Int
$limit:Int
$search:String
$authorId:Int
$orderBy:String
){

allBooks(
page:$page
limit:$limit
search:$search
authorId:$authorId
orderBy:$orderBy
){

total
page
pages

books{

id
title
publishedDate

author{
name
}

}

}

}
`;

export const FETCH_AUTHORS_QUERY = gql`

query{

allAuthors{

id
name

}

}

`;