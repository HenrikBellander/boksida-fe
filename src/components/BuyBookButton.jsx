import React, { useState } from "react";
import "../styles/buyBookButton.css"; 

const BuyBookButton = ({ bookId, isBought, toggleBuy }) => {
  const [bought, setBought] = useState(isBought);

  const handleClick = () => {
    setBought(!bought);
    toggleBuy(bookId, !bought);
  };

  return (
    <button
      onClick={handleClick}
      className={`buy-btn ${bought ? "active" : ""}`}
    >
      &#10004;
    </button>
  );
};

export default BuyBookButton;