import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../styles/Filters.css';
import {
  categoriesDrinksFetch,
  categoriesMealsFetch,
  categoryDrinksFetch,
  categoryMealsFetch,
  allMealsFetch,
  allDrinksFetch,
} from '../services/fetchAPI';

function Filters({ title }) {
  const [fetchCategories, setFetchCategories] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const { setRecipes } = useContext(RecipesContext);
  const MAX_FILTERS = 4;

  useEffect(() => {
    const categoriesMap = async () => {
      const response =
        title === 'Meals' ? await categoriesMealsFetch() : await categoriesDrinksFetch();
      const data = response.slice(0, MAX_FILTERS);
      setFetchCategories(data);
    };

    categoriesMap();
  }, [title]);

  const clearAllFilters = async () => {
    const response =
      title === 'Meals' ? await allMealsFetch() : await allDrinksFetch();
    setRecipes(response);
  };

  const filterByCategory = async (param) => {
    setToggleCategory(param);
    const response =
      title === 'Meals' ? await categoryMealsFetch(param) : await categoryDrinksFetch(param);
    setRecipes(response);
  };

  const filterResultAPI = (param) => {
    if (!toggleCategory || toggleCategory !== param) {
      filterByCategory(param);
    } else {
      setToggleCategory(false);
      clearAllFilters();
    }
  };

  return (
    <div className="containerFilters">
      <button
        className="buttonFilters"
        onClick={() => {
          setToggleCategory(false);
          clearAllFilters();
        }}
      >
        All
      </button>

      {fetchCategories.map((category) => (
        <button
          className="buttonFilters"
          key={category.strCategory}
          onClick={() => filterResultAPI(category.strCategory)}
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

export default Filters;
