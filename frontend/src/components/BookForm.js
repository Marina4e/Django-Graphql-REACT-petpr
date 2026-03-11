import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

import { CREATE_BOOK_MUTATION } from "../mutations";
import { FETCH_BOOKS_QUERY } from "../queries";

const FETCH_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
    }
  }
`;

function BookForm() {

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [isbn, setIsbn] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: authorsData } = useQuery(FETCH_AUTHORS);

  const [createBook] = useMutation(CREATE_BOOK_MUTATION);

  const handleCreateBook = async () => {

    try {

      await createBook({
        variables: {
          title,
          authorId: parseInt(authorId),
          publishedDate,
          isbn
        },

        // 👇 ГОЛОВНЕ ВИПРАВЛЕННЯ
        refetchQueries: [
          { query: FETCH_BOOKS_QUERY }
        ],

        awaitRefetchQueries: true
      });

      setSuccess("✅ Книга успішно створена!");

      setTimeout(() => {
        setSuccess("");
      }, 10000);

      setTitle("");
      setAuthorId("");
      setPublishedDate("");
      setIsbn("");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="formBox">

      <h2>📘 Створити нову книгу</h2>

      <input
        placeholder="Назва книги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      >
        <option value="">Оберіть автора</option>

        {authorsData?.allAuthors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}

      </select>

      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />

      <input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />

      <button
        onClick={handleCreateBook}
        disabled={!title || !authorId || !publishedDate}
      >
        Створити книгу
      </button>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

    </div>
  );
}

export default BookForm;
