import React from "react";
import "../styles/buyBookButton.css"; 

const BuyBookButton = ({ bookId, isBought, toggleBuy }) => {
  const handleClick = () => {
    toggleBuy(bookId, !isBought);
  };

  return (
    <button
      onClick={handleClick}
      className={`buy-btn ${isBought ? "active" : ""}`}
    >
      &#10004;
    </button>
  );
};

export default BuyBookButton;