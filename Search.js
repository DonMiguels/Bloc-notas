// components/Search.js
import React from 'react';
import '../styles/Search.css';

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar notas por título"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input" 
      />
    </div>
  );
};

export default Search;
