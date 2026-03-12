import React,{useState} from "react";
import {useQuery} from "@apollo/client/react";
import {Link} from "react-router-dom";
import {FETCH_BOOKS_QUERY} from "../queries";

function BooksLibrary(){

const [page,setPage] = useState(1)

const {loading,error,data} = useQuery(FETCH_BOOKS_QUERY,{
variables:{
page:page,
limit:8
}
})

if(loading) return <p>Loading...</p>
if(error) return <p>{error.message}</p>

const books = data.allBooks.books
const totalPages = data.allBooks.pages

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

<div className="pagination">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
>
Previous
</button>

<span>
Page {page} of {totalPages}
</span>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
>
Next
</button>

</div>

</div>

)

}

export default BooksLibrary
