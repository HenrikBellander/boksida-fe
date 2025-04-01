import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import FavoriteButton from "../components/FavoriteButton"; 
import BuyBookButton from "../components/BuyBookButton";
import '../styles/books.css';

const BooksByCategory = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [favorites, setFavorites] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);

  // Load favorites from local storage
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

  // Toggle Buy status and send request to backend
  const toggleBuy = async (bookId, status) => {
    // Assume that the user is logged in and user data is stored in localStorage as JSON.
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData ? userData.user_id : null;
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    if (status) {
      // Add book to basket (quantity set to 1)
      try {
        const response = await fetch('http://localhost:5000/api/basket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
            quantity: 1
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add book to basket');
        }
        setBoughtBooks(prev => [...prev, bookId]);
      } catch (error) {
        console.error('Error adding book to basket:', error);
      }
    } else {
      // Optionally: remove book from basket (if your API supports this)
      try {
        const response = await fetch(`http://localhost:5000/api/basket/${bookId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to remove book from basket');
        }
        setBoughtBooks(prev => prev.filter(id => id !== bookId));
      } catch (error) {
        console.error('Error removing book from basket:', error);
      }
    }
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
              <BuyBookButton 
                bookId={book.book_id} 
                isBought={boughtBooks.includes(book.book_id)}
                toggleBuy={toggleBuy}
              />
            </div>

            <p>
              <Link to={`/book/${book.book_id}`}>
                {book.book_title}
              </Link>
            </p>
            
            <p className="book-price">Price: {book.book_price}</p>

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