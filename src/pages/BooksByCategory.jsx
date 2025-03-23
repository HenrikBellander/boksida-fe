import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";

const BooksByCategory = () => {
  const { category } = useParams(); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksByCategory(category);
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadBooks();
  }, [category]);

  if (loading) {
    return <div>Laddar böcker...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Böcker i kategorin {category}</h2>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>{book.book_title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksByCategory;
