import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      publishedDate
      isbn
      author { name }
    }
  }
`;

function BooksList() {
  const { loading, error, data } = useQuery(ALL_BOOKS_QUERY);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;
  if (!data || data.allBooks.length === 0) return <p>Ще немає книг 📭</p>;

  return (
    <div>
      <h2>📚 Бібліотека</h2>
      {data.allBooks.map((book) => (
        <div key={book.id}>
          <strong>{book.title}</strong>
          <div>Автор: {book.author.name}</div>
          <div>Дата: {book.publishedDate}</div>
          <div>ISBN: {book.isbn}</div>
        </div>
      ))}
    </div>
  );
}

export default BooksList;
