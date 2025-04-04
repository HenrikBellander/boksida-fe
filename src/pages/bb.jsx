import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import FavoriteButton from "../components/FavoriteButton"; 
import '../styles/books.css';

const BooksByCategory = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const saveFavoritesToLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = (bookId, status) => {
    let updatedFavorites;
    if (status) {
      updatedFavorites = [...favorites, bookId];
    } else {
      updatedFavorites = favorites.filter(id => id !== bookId);
    }
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star-rating full">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star-rating empty">&#9733;</span>);
      }
    }
    return stars;
  };

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
      <div className="books-container">
        {books.map((book) => (
          <div key={book.book_id} className="book-item">
            <div className="image-container">
              <img src={book.book_image_url} alt={book.book_title} />
              <FavoriteButton 
                bookId={book.book_id} 
                isFavorite={favorites.includes(book.book_id)} 
                toggleFavorite={toggleFavorite} 
              />
            </div>

            <p>
              <Link to={`/book/${book.book_id}`}>
                {book.book_title}
              </Link>
            </p>
            
            <p className="book-price">Price: {book.book_price} </p>

            <div className="stars">
              {renderStars(book.book_rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;