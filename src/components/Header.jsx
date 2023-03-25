import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const history = useHistory();
  const { handleSearch } = useContext(RecipesContext);
  const [formData, setFormData] = useState({ searchInput: '', searchRadio: 'ingredient' });

  const handleClick = () => {
    const { searchInput, searchRadio } = formData;
  
    if (searchRadio === 'first-letter' && searchInput.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
    return searchInput.length === 0
      ? window.alert('Your search must have at least 1 (one) character')
      : handleSearch({ searchInput, searchRadio, path: history.location.pathname });
  };  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="searchInput"
          id="search-input"
          data-testid="search-input"
          placeholder="Search"
          value={formData.searchInput}
          onChange={handleChange}
        />
        <div />
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            name="searchRadio"
            id="ingredient-search"
            data-testid="ingredient-search-radio"
            value="ingredient"
            checked={formData.searchRadio === 'ingredient'}
            onChange={handleChange}
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            name="searchRadio"
            id="name-search"
            data-testid="name-search-radio"
            value="name"
            checked={formData.searchRadio === 'name'}
            onChange={handleChange}
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            name="searchRadio"
            id="first-letter-search"
            data-testid="first-letter-search-radio"
            value="first-letter"
            checked={formData.searchRadio === 'first-letter'}
            onChange={handleChange}
          />
          First Letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
