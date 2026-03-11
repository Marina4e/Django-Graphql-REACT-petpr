import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import BookForm from "./components/BookForm";
import BooksLibrary from "./components/BooksLibrary";

import "./styles.css";

function App() {

  return (
    <BrowserRouter>

      <div className="container">

        <h1>📚 Моя бібліотека</h1>

        <nav className="menu">

          <Link to="/">Бібліотека</Link>

          <Link to="/create-book">Створити книгу</Link>

        </nav>

        <Routes>

          <Route path="/" element={<BooksLibrary />} />

          <Route path="/create-book" element={<BookForm />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
