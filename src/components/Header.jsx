import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="bookstore-header">
      <div className="logo-container">
        <h1 className="logo">Bookstore</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      <nav className="navbar">
        <a href="/" className="nav-link">Home</a>
        <a href="/register" className="nav-link">Register</a>
        <a href="/team" className="nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;



