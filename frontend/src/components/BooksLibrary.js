import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";

import { FETCH_BOOKS_QUERY } from "../queries";

function BooksLibrary(){

  const [page,setPage] = useState(1);

  const {loading,error,data} = useQuery(
    FETCH_BOOKS_QUERY,
    {
      variables:{
        page:page,
        limit:6
      }
    }
  );

  if(loading) return <p>Завантаження...</p>;

  if(error) return <p>Помилка</p>;

  return(

    <div>

      <h2>📚 Бібліотека</h2>

      <div className="booksGrid">

        {data?.allBooks.map(book =>(

          <div key={book.id} className="bookCard">

            <h3>{book.title}</h3>

            <p><b>Автор:</b> {book.author.name}</p>

            <p><b>Дата:</b> {book.publishedDate}</p>

          </div>

        ))}

      </div>

      <div className="pagination">

        <button onClick={()=>setPage(page-1)} disabled={page===1}>
          ← Попередня
        </button>

        <span>Сторінка {page}</span>

        <button onClick={()=>setPage(page+1)}>
          Наступна →
        </button>

      </div>

    </div>

  );

}

export default BooksLibrary;