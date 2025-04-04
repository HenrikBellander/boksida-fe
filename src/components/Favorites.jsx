import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';  

const Favorites = () => {
  const { user } = useAuth();  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <div>Du är inte inloggad</div>;
  }

  const userId = user.id;

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
      if (!response.ok) {
        throw new Error('Kunde inte hämta favoriter');
      }
      const data = await response.json();
      console.log(data);  
      setFavorites(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (bookId) => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          book_id: bookId
        })
      });

      if (!response.ok) {
        throw new Error('Kunde inte ta bort favorit');
      }

      setFavorites(prevFavorites => prevFavorites.filter(book => book.book_id !== bookId));
      console.log("Favorite removed");
    } catch (error) {
      setError(error.message);
      console.error('Error removing favorite:', error);
    }
  };

  useEffect(() => {
    if (userId) { 
      fetchFavorites();
    }
  }, [userId]);

  if (loading) return <div>Laddar favoriter...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{user.username}'s Favorites</h2>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>Du har inga favoriter ännu.</p>
        ) : (
          <ul>
            {favorites.map((book, index) => (
              <li key={index}> 
                <img src={book.book_image_url} alt={book.book_title} width="100" />
                <p>{book.book_title}</p>
                <button onClick={() => handleRemoveFavorite(book.book_id)}>Ta bort från favoriter</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;








