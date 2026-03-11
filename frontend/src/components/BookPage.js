import React from "react";
import {useParams,useNavigate} from "react-router-dom";
import {useQuery,useMutation} from "@apollo/client/react";
import {gql} from "@apollo/client";

const GET_BOOK = gql`
query($id:Int!){
bookById(id:$id){
id
title
summary
publishedDate
author{
name
}
}
}
`;

const DELETE_BOOK = gql`
mutation($id:Int!){
deleteBook(id:$id){
ok
}
}
`;

function BookPage(){

const {id} = useParams()
const navigate = useNavigate()
const [message,setMessage] = React.useState("")
const {loading,error,data} = useQuery(GET_BOOK,{
variables:{id:Number(id)}
})

const [deleteBook] = useMutation(DELETE_BOOK)

if(loading) return <p>Loading...</p>
if(error) return <p>Error</p>

const book = data.bookById

return(

<div className="bookPage">

<h2 className="bookTitle">{book.title}</h2>

<p className="bookInfo">
<b>Author:</b> {book.author.name}
</p>

<p className="bookInfo">
<b>Date:</b> {book.publishedDate}
</p>

<p className="bookInfo">
{book.summary}
</p>

{message && (
<p style={{color:"green"}}>
{message}
</p>
)}

<div className="bookButtons">

<button
className="editButton"
onClick={()=>navigate(`/edit/${book.id}`)}
>
Edit Book
</button>

<button
className="deleteButton"
onClick={async()=>{

await deleteBook({
variables:{id:Number(id)}
})

setMessage("Book deleted ✅")

setTimeout(()=>{
navigate("/library")
},12000)

}}
>
Delete Book
</button>

</div>

</div>

)
}

export default BookPage
