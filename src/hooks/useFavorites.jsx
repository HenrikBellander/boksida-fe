import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const useFavorites = () => {
  const { user } = useAuth(); 
  console.log('User:', user);  

  const userId = user?.id || 2; 

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!userId) return; 

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
        if (!response.ok) {
          throw new Error('Kunde inte hämta favoriter');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const toggleFavorite = async (bookId, status) => {
    const updatedFavorites = status 
      ? [...favorites, bookId] 
      : favorites.filter(id => id !== bookId);

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    try {
      console.log('Sending user_id:', userId);
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: status ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, book_id: bookId })
      });
      if (!response.ok) throw new Error(`Failed to ${status ? 'add' : 'remove'} favorite`);
    } catch (error) {
      console.error(`Error ${status ? 'adding' : 'removing'} favorite:`, error);
    }
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;







