import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBooksByCategory } from "../services/bookApi";
import '../styles/books.css'; 

const BooksByCategory = () => {
  const { category } = useParams(); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertRatingToNumber = (rating) => {
    switch (rating.toLowerCase()) {
      case "one":
        return 1;
      case "two":
        return 2;
      case "three":
        return 3;
      case "four":
        return 4;
      case "five":
        return 5;
      default:
        return 0; 
    }
  };

  const renderStars = (rating) => {
    const ratingNumber = convertRatingToNumber(rating); 
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNumber) {
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
            <img src={book.book_image_url} alt={book.book_title} />
            
            <p>
              <Link to={`/book/${book.book_id}`}>
                {book.book_title}
              </Link>
            </p>

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
