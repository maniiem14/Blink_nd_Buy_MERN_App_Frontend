import "./SearchBar.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const SearchBar = () => {
  const { products } = useContext(AppContext);

  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchItem.trim()) {
      const searchTermLower = searchItem.toLowerCase();
      const filteredSuggestions = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTermLower) ||
          p.category.toLowerCase().includes(searchTermLower)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/${suggestion._id}`);
    setSearchItem("");
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for products, categories..."
          value={searchItem}
          required
          onChange={(e) => {
            setSearchItem(e.target.value);
            setShowSuggestions(true);
          }}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.title} <span>({suggestion.category})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
