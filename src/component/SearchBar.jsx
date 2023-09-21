"use client";
import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search by name"
        value={query}
        onChange={handleSearchQuery}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
