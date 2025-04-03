import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import FavoriteButton from "../components/FavoriteButton"; 
import BuyBookButton from "../components/BuyBookButton";
import '../styles/books.css';
import { useAuth } from "../context/AuthContext";

const BooksByCategory = () => {
  const { category } = useParams();
  const { user } = useAuth(); // Use the user from AuthContext
  console.log('Logged in user:', user);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [favorites, setFavorites] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [basket, setBasket] = useState(null);
  const [showBasket, setShowBasket] = useState(false);

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

  // Toggle Buy status and send request to backend using the user id from AuthContext
  const toggleBuy = async (bookId, status) => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }
    const userId = user.id;

    if (status) {
      // Add book to basket (quantity set to 1)
      try {
        const response = await fetch('http://localhost:5000/api/basket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, book_id: bookId, quantity: 1 })
        });
        if (!response.ok) {
          throw new Error('Failed to add book to basket');
        }
        setBoughtBooks(prev => [...prev, bookId]);
      } catch (error) {
        console.error('Error adding book to basket:', error);
      }
    } else {
      // Remove book from basket
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

  // Fetch the basket items from the backend using the logged-in user's id
  const fetchBasket = async () => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/basket/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch basket');
      }
      const data = await response.json();
      setBasket(data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  // Toggle basket visibility; if opening, fetch the basket using the current user's id
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
      <h2>Böcker i kategorin {category}</h2>
      <button onClick={toggleBasketVisibility}>
        {showBasket ? 'Göm/Uppdatera Varukorg' : 'Visa Varukorg'}
      </button>
      
      {showBasket && basket && (
        <div className="basket-box">
          <h3>
            VARUKORG{" "}
          </h3>
          <table style={{ borderCollapse: "collapse", width: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Kategori</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Böcker</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Pris</th>
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