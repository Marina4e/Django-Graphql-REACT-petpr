import React,{useState} from "react";
import {useQuery,useMutation} from "@apollo/client/react";
import {gql} from "@apollo/client";
import {FETCH_AUTHORS_QUERY,FETCH_BOOKS_QUERY} from "../queries";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const CREATE_BOOK = gql`
mutation(
$title:String!
$authorId:Int!
$publishedDate:Date!
$isbn:String!
$summary:String
){
createBook(
title:$title
authorId:$authorId
publishedDate:$publishedDate
isbn:$isbn
summary:$summary
){
book{
id
}
}
}
`;

function BookForm(){

const navigate = useNavigate()

const [title,setTitle] = useState("")
const [authorId,setAuthorId] = useState("")
const [date,setDate] = useState("")
const [isbn,setIsbn] = useState("")
const [summary,setSummary] = useState("")

const {data:authorsData} = useQuery(FETCH_AUTHORS_QUERY)

const [createBook] = useMutation(CREATE_BOOK)

const submit = async(e)=>{

e.preventDefault()

try{

await createBook({

variables:{
title,
authorId:Number(authorId),
publishedDate:date,
isbn,
summary
},

refetchQueries:[
{query:FETCH_BOOKS_QUERY}
]

})

toast.success("Книгу створено 📚")

setTimeout(()=>{
navigate("/library")
},3000)

}catch(err){

toast.error("Error creating book")

}

}

return(

<div className="formWrapper">

<form className="formContainer" onSubmit={submit}>

<h2>Create Book</h2>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<select
value={authorId}
onChange={(e)=>setAuthorId(e.target.value)}
>

<option value="">Select Author</option>

{authorsData?.allAuthors.map(author=>(

<option key={author.id} value={author.id}>
{author.name}
</option>

))}

</select>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<input
placeholder="ISBN"
value={isbn}
onChange={(e)=>setIsbn(e.target.value)}
/>

<textarea
placeholder="Summary"
value={summary}
onChange={(e)=>setSummary(e.target.value)}
/>

<button type="submit">
Create Book
</button>

</form>

</div>

)

}

export default BookForm
