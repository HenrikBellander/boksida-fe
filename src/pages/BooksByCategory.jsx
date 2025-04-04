import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import FavoriteButton from "../components/FavoriteButton"; 
import BuyBookButton from "../components/BuyBookButton";
import useFavorites from "../hooks/useFavorites";
import '../styles/books.css';

const BooksByCategory = () => {
  const { category } = useParams();
  console.log('Received category param:', category); 

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [basket, setBasket] = useState(null);
  const [showBasket, setShowBasket] = useState(false);

  const userData = JSON.parse(localStorage.getItem('user')) || { user_id: 2 };
  const userId = userData.user_id;

  const { favorites, toggleFavorite } = useFavorites(userId); 

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/basket/${userId}`);
        if (!response.ok) {
          throw new Error('Kunde inte hämta varukorgen');
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

    fetchBasket();
  }, [userId]);  

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
      <button onClick={() => setShowBasket(!showBasket)}>
        {showBasket ? 'Göm Varukorg' : 'Visa Varukorg'}
      </button>

      {showBasket && basket && (
        <div className="basket-box">
          <h3>VARUKORG</h3>
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
                toggleBuy={() => {}}
              />
            </div>
            <p>
              <Link to={`/book/${book.book_id}`}>
                {book.book_title}
              </Link>
            </p>
            <p className="book-price">Price: {book.book_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;

