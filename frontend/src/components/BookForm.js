import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

// GraphQL
const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($title: String!, $authorId: Int!, $publishedDate: Date!, $isbn: String!) {
    createBook(title: $title, authorId: $authorId, publishedDate: $publishedDate, isbn: $isbn) {
      book {
        id
        title
        publishedDate
        isbn
        author { id name }
      }
    }
  }
`;

const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      publishedDate
      isbn
      author { id name }
    }
  }
`;

const ALL_AUTHORS_QUERY = gql`
  query AllAuthors {
    allAuthors {
      id
      name
    }
  }
`;

// Helper
function formatDateToGraphQL(dateStr) {
  const [day, month, year] = dateStr.split('.');
  if (!day || !month || !year) return null;
  return `${year}-${month}-${day}`;
}

// Component
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: booksData, refetch: refetchBooks } = useQuery(ALL_BOOKS_QUERY);
  const { data: authorsData } = useQuery(ALL_AUTHORS_QUERY);
  const [createBook, { loading }] = useMutation(CREATE_BOOK_MUTATION);

  const handleCreateBook = async () => {
    setErrorMessage('');
    const formattedDate = formatDateToGraphQL(publishedDate);

    if (!formattedDate) {
      setErrorMessage('Невірний формат дати (ДД.ММ.ГГГГ)');
      return;
    }

    if (!authorId) {
      setErrorMessage('Виберіть автора');
      return;
    }

    try {
      await createBook({
        variables: {
          title,
          authorId: parseInt(authorId),
          publishedDate: formattedDate,
          isbn,
        },
      });

      await refetchBooks();

      setTitle('');
      setAuthorId('');
      setPublishedDate('');
      setIsbn('');
    } catch (err) {
      setErrorMessage(err.message || 'Помилка при створенні книги');
    }
  };

  return (
    <div>
      <h2>Створити книгу</h2>

      <input placeholder="Назва" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        <option value="">Выберите автора</option>
        {authorsData?.allAuthors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <input placeholder="ДД.ММ.ГГГГ" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

      <button onClick={handleCreateBook} disabled={loading}>
        {loading ? 'Створення...' : 'Створити книгу'}
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h3>Список книг</h3>
      <ul>
        {booksData?.allBooks.map((book) => (
          <li key={book.id}>
            {book.title} | {book.author.name} | {book.publishedDate} | {book.isbn}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookForm;
