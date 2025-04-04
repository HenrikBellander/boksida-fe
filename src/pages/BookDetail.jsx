import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteButton from "../components/FavoriteButton"; 
import { fetchBookDetail } from "../services/bookApi";
import useFavorites from "../hooks/useFavorites"; // Importera hooken
import '../styles/books.css';

const BookDetail = () => {
  const { book_id } = useParams();  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites(); // Använd hooken

  useEffect(() => {
    const loadBookDetail = async () => {
      try {
        const data = await fetchBookDetail(book_id);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadBookDetail();
  }, [book_id]);

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-detail">
      <h2>{book.book_title}</h2>
      <img src={book.book_image_url} alt={book.book_title} />
      <p><strong>Beskrivning:</strong> {book.book_description}</p>

      <FavoriteButton 
        bookId={book.book_id} 
        isFavorite={favorites.includes(book.book_id)} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default BookDetail;

