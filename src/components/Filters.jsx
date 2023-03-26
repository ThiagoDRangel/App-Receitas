import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/Filters.css';
import {
  categoriesDrinksFetch,
  categoriesMealsFetch,
  categoryDrinksFetch,
  categoryMealsFetch,
  allMealsFetch,
  allDrinksFetch,
} from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

export default function Filters({ title }) {
  const [fetchCategories, setFetchCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { setRecipes } = useContext(RecipesContext);
  const MAX_FILTERS = 5;

  const fetchCategoriesByTitle = async () => {
    try {
      const fetchFunction = title === 'Meals' ? categoriesMealsFetch : categoriesDrinksFetch;
      const response = await fetchFunction();
      setFetchCategories(response.slice(0, MAX_FILTERS));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  useEffect(() => {
    fetchCategoriesByTitle();
  }, []);
  

  const clearFilters = async () => {
    const fetchFunction = title === 'Meals' ? allMealsFetch : allDrinksFetch;
    const response = await fetchFunction();
    setRecipes(response);
  };

  const filterByCategory = async (category) => {
    const fetchFunction = title === 'Meals' ? categoryMealsFetch : categoryDrinksFetch;
    const response = await fetchFunction(category);
    setRecipes(response);
  };

  const handleFilterClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      clearFilters();
    } else {
      setSelectedCategory(category);
      filterByCategory(category);
    }
  };

  return (
    <div className="containerFilters">
      <button
        className="buttonFilters"
        data-testid="All-category-filter"
        onClick={clearFilters}
      >
        All
      </button>

      {fetchCategories.map((category) => (
        <button
          className={`buttonFilters ${category.strCategory === selectedCategory ? 'selected' : ''}`}
          key={category.strCategory}
          data-testid={`${category.strCategory}-category-filter`}
          onClick={() => handleFilterClick(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

Filters.propTypes = {
  title: PropTypes.string.isRequired,
};
