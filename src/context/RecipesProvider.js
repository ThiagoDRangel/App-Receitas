import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const stateDefault = {
    category: '',
    ingredient: [''],
    instruction: '',
    measure: [''],
    thumb: '',
    title: '',
    video: '',
  };

  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(stateDefault);
  const [dataDetails, setDataDetails] = useState({});

  const context = useMemo(() => ({
    dataDetails,
    recipeId,
    recipes,
    setDataDetails,
    setRecipeId,
    setRecipes,
  }), [dataDetails, recipes, recipeId]);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};