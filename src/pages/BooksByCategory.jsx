import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import FavoriteButton from "../components/FavoriteButton"; 
import BuyBookButton from "../components/BuyBookButton";
import '../styles/books.css';
import { useAuth } from "../context/AuthContext";

const BooksByCategory = () => {
  const { category } = useParams();
  console.log('Received category param:', category);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [basket, setBasket] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const { user } = useAuth(); // Get user data from context
  console.log('User data from context:', user);
  const [userId, setUserId] = useState(user ? user.id : null);
  console.log('User ID:', userId);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Define fetchBasket function above toggleBuy so it's available when called
  const fetchBasket = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/basket/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch basket');
      }
      const data = await response.json();
      setBasket(data);
      if (data.basket_items) {
        setBoughtBooks(data.basket_items.map(item => item.book_id));
      }
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  // Hämta varukorgen när komponenten mountas
  useEffect(() => {
    if (user) {
      fetchBasket();
    }
  }, [user]);

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

  // Ta bort eller lägg till bok i varukorgen
  const toggleBuy = async (bookId, status) => {
    const userId = user?.id;
    if (!userId) {
      console.error("User is not logged in");
      return;
    }
  
    if (status) {
      // Lägg till bok
      try {
        const response = await fetch('http://localhost:5000/api/basket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, book_id: bookId, quantity: 1 })
        });
        if (!response.ok) throw new Error('Kunde inte lägga till boken i varukorgen');
        setBoughtBooks(prev => [...prev, bookId]);
        if (showBasket) fetchBasket();
      } catch (error) {
        console.error('Error adding book to basket:', error);
      }
    } else {
      // Ta bort bok
      try {
        const response = await fetch(`http://localhost:5000/api/basket/${bookId}?user_id=${userId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Kunde inte ta bort boken från varukorgen');
        setBoughtBooks(prev => prev.filter(id => id !== bookId));
        if (showBasket) fetchBasket();
      } catch (error) {
        console.error('Error removing book from basket:', error);
      }
    }
  };

  // Toggle basket visibility; fetch data if showing
  const toggleBasketVisibility = () => {
    if (!showBasket) {
      fetchBasket();
    }
    setShowBasket(!showBasket);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star-rating full" : "star-rating empty"}>
          &#9733;
        </span>
      );
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

  if (loading) return <div>Laddar böcker...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Books in the category: {category}</h2>
      <button onClick={toggleBasketVisibility}>
        {showBasket ? 'Hide Basket' : 'Show Basket'}
      </button>
      
      {showBasket && basket && (
        <div className="basket-box">
          <h3>
            Your current BASKET{" "} <span style={{ fontWeight: 'normal' }}>(We know you as {user.username})</span>
          </h3>
          <table style={{ borderCollapse: "collapse", width: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Category</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Books</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {basket.basket_items.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>{item.book_category}</td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>{item.book_title}</td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>{item.book_price} SEK</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" style={{ border: "1px solid #000", padding: "8px", fontWeight: "bold" }}>
                  Total
                </td>
                <td style={{ border: "1px solid #000", padding: "8px", fontWeight: "bold" }}>
                  {basket.total} SEK
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
            <div className="stars">{renderStars(book.book_rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;