import React,{useState} from "react";
import {useQuery} from "@apollo/client/react";
import {Link} from "react-router-dom";

import {FETCH_BOOKS_QUERY,FETCH_AUTHORS_QUERY} from "../queries";

function BooksLibrary(){

const [page,setPage] = useState(1);
const [search,setSearch] = useState("")
const [authorId,setAuthorId] = useState("")
const [sort,setSort] = useState("")

const {data:authorsData} = useQuery(FETCH_AUTHORS_QUERY)

const {loading,error,data,refetch} = useQuery(
FETCH_BOOKS_QUERY,
{
variables:{
page,
limit:8,
search,
authorId: authorId ? parseInt(authorId) : null,
orderBy:sort || null
}
}
)

if(loading) return <p>Loading...</p>
if(error) return <p>Error</p>

const books = data?.allBooks?.books || []

return(

<div>

<h2>📚 Library</h2>

<div className="filters">

<input
placeholder="Search book"
value={search}
onChange={(e)=>{
setPage(1)
setSearch(e.target.value)
}}
/>

<select
value={authorId}
onChange={(e)=>{
setPage(1)
setAuthorId(e.target.value)
}}
>

<option value="">All authors</option>

{authorsData?.allAuthors.map(author=>(
<option key={author.id} value={author.id}>
{author.name}
</option>
))}

</select>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
>

<option value="">Sort</option>
<option value="published_date">Date ↑</option>
<option value="-published_date">Date ↓</option>

</select>

</div>

<div className="booksGrid">

{books.map(book=>(

<Link to={`/book/${book.id}`} key={book.id}>

<div className="bookCard">

<h3>{book.title}</h3>

<p>Author: {book.author.name}</p>

<p>{book.publishedDate}</p>

</div>

</Link>

))}

</div>

<div className="pagination">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
>
←
</button>

<span>
{page} / {data.allBooks.pages}
</span>

<button
onClick={()=>setPage(page+1)}
disabled={page===data.allBooks.pages}
>
→
</button>

</div>

</div>

)

}

export default BooksLibrary