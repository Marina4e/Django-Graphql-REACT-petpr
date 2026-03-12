import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import BookPage from "./components/BookPage";
import BookForm from "./components/BookForm";
import BooksLibrary from "./components/BooksLibrary";
import EditBook from "./components/EditBook";
import HomePage from "./components/HomePage";

import "./styles.css";

function App() {

return (

<BrowserRouter>

<div className="container">

<h1 className="title">📚 Home Library</h1>

<nav className="menu">

<Link to="/">Home</Link>

<Link to="/library">Бібліотека</Link>

<Link to="/create-book">Створити книгу</Link>

</nav>

<Routes>

<Route path="/" element={<HomePage />} />

<Route path="/library" element={<BooksLibrary />} />

<Route path="/create-book" element={<BookForm />} />

<Route path="/book/:id" element={<BookPage />} />

<Route path="/edit/:id" element={<EditBook />} />

</Routes>

</div>

</BrowserRouter>

);

}

export default App;
