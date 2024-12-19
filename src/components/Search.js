import React, { useState } from "react";
import "../styles/Search.scss";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onSearch) {
      onSearch(value); // Trigger search on every keystroke
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (onSearch) {
      onSearch(""); // Clear search
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue); // Trigger search on button click
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Search your blogs..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
