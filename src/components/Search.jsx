import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchBooks } from '../services/bookApi';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchBooks(query)
        .then(results => {
          setSearchResults(results);
        })
        .catch(error => {
          setError('Error fetching search results');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  const handleBookClick = (bookId) => {
    window.location.href = `/book/${bookId}`;
  };

  return (
    <div className="search-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : searchResults.length > 0 ? (
        <div className="search-results">
          <ul>
            {searchResults.map((book) => (
              <li key={book.book_id} onClick={() => handleBookClick(book.book_id)}>
                <h3>{book.book_title}</h3>
                <img src={book.book_image_url} alt={book.book_title} width="100" />
                <p>{book.book_description}</p>
                <p><strong>Category:</strong> {book.book_category || 'No category'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No books found for your search.</div>
      )}
    </div>
  );
};

export default Search;