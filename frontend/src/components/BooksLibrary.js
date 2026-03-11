import React from "react";
import {useQuery} from "@apollo/client/react";
import {Link} from "react-router-dom";
import {FETCH_BOOKS_QUERY} from "../queries";

function BooksLibrary(){

const {loading,error,data} = useQuery(FETCH_BOOKS_QUERY,{
variables:{
page:1,
limit:20
}
})

if(loading) return <p>Loading...</p>
if(error) return <p>{error.message}</p>

const books = data.allBooks.books

return(

<div className="library">

<h2>Library</h2>

<div className="booksGrid">

{books.map(book=>(

<Link key={book.id} to={`/book/${book.id}`}>

<div className="bookCard">

<h3>{book.title}</h3>

<p>{book.author.name}</p>

</div>

</Link>

))}

</div>

</div>

)

}

export default BooksLibrary
