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

const {loading,error,data} = useQuery(GET_BOOK,{
variables:{id:Number(id)}
})

const [deleteBook] = useMutation(DELETE_BOOK)

if(loading) return <p>Loading...</p>
if(error) return <p>Error loading book</p>

const book = data.bookById

return(

<div className="bookPage">

<h2>{book.title}</h2>

<p>
<b>Author:</b> {book.author.name}
</p>

<p>
<b>Date:</b> {book.publishedDate}
</p>

<p>{book.summary}</p>

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

navigate("/library")

}}
>
Delete Book
</button>

</div>

</div>

)

}

export default BookPage
