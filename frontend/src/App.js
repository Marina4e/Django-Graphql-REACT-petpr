import React from 'react';
import './styles.css';

import BooksList from './components/BooksList';
import BookForm from './components/BookForm';


function App() {
  return (
    <div className="container">
      <h1>📚 Моя бібліотека</h1>
      <BookForm />
      <BooksList />

    </div>
  );
}

export default App;
