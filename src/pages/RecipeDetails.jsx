import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { idDrinkFetch, idMealFetch } from '../services/fetchAPI';
import CardDetails from '../components/CardDetails';
import RecipesContext from '../context/RecipesContext';
import { createObjectDetails } from '../helpers/createObjectDetails';
import { objectRecipeId } from '../helpers/returnAPI';

function RecipeDetails({ match }) {
  const { recipeId, setRecipeId, setDataDetails } = useContext(RecipesContext);
  const { id } = match.params;
  const { path } = match;

  const filterKeys = (object, param) => Object.keys(object)
  .filter(key => param.test(key))
  .reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      const response = path === '/meals/:id' ? await idMealFetch(id) : await idDrinkFetch(id);
      const objectApi = response && response[path.split('/')[1] + 's'] && response[path.split('/')[1] + 's'][0];
      if (objectApi) {
        setDataDetails(createObjectDetails(objectApi, path === '/meals/:id'));
        const ingredients = filterKeys(objectApi, /strIngredient\d+/);
        const measures = filterKeys(objectApi, /strMeasure\d+/);
        setRecipeId(objectRecipeId(objectApi, path, ingredients, measures));
      }
    };
    fetchData();
  }, []);
  

  return (
    <h1>< CardDetails params={ recipeId } /> </h1>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
