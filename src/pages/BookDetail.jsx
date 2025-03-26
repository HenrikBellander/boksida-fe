import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // För att hämta book_id från URL

const BookDetail = () => {
  const { book_id } = useParams();  // Hämta book_id från URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/book/${book_id}`);
        if (!response.ok) {
          throw new Error('Boken hittades inte');
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [book_id]);  // Anropa om book_id ändras

  if (loading) {
    return <div>Laddar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <img src={book.book_image_url}/>
      <p><strong>Title:</strong> {book.book_title}</p>
      <p><strong>Beskrivning:</strong> {book.book_description}</p>
    </div>
  );
};

export default BookDetail;
