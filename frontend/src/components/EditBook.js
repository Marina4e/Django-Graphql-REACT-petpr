import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {useQuery,useMutation} from "@apollo/client/react";
import {gql} from "@apollo/client";
import { toast } from "react-toastify";

const GET_BOOK = gql`
query($id:Int!){
bookById(id:$id){
id
title
summary
}
}
`;

const UPDATE_BOOK = gql`
mutation($id:Int!,$title:String,$summary:String){
updateBook(id:$id,title:$title,summary:$summary){
book{
id
title
}
}
}
`;

function EditBook(){

const {id} = useParams()
const navigate = useNavigate()

const {data} = useQuery(GET_BOOK,{
variables:{id:Number(id)}
})

const [title,setTitle] = useState("")
const [summary,setSummary] = useState("")

const [updateBook] = useMutation(UPDATE_BOOK)

useEffect(()=>{

if(data){

setTitle(data.bookById.title)
setSummary(data.bookById.summary || "")

}

},[data])

const submit = async(e)=>{

e.preventDefault()

await updateBook({
variables:{
id:Number(id),
title,
summary
}
})

toast.success("Книгу відредаговано ✏️")

setTimeout(()=>{
navigate(`/book/${id}`)
},3000)
}

return(

<form className="formContainer" onSubmit={submit}>

<h2>Edit Book</h2>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
value={summary}
onChange={(e)=>setSummary(e.target.value)}
/>

<button type="submit">
Save
</button>

</form>

)

}

export default EditBook
