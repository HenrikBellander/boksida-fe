import React, { useState } from "react";
import "../styles/favoriteButton.css"; 

const FavoriteButton = ({ bookId, isFavorite, toggleFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClick = () => {
    setFavorite(!favorite); 
    toggleFavorite(bookId, !favorite); 
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-btn ${favorite ? "active" : ""}`}
    >
      &#10084; 
    </button>
  );
};

export default FavoriteButton;



