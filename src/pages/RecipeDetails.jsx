import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { idMealFetch, idDrinkFetch } from '../services/fetchAPI';
import CardDetails from '../components/CardDetails';
import Recomendation from '../components/Recomendation';
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
    const PARAM_INGREDIENT = /strIngredient\d+/;
    const PARAM_MEASURE = /strMeasure\d+/;
    const idFetchs = async () => {
      if (path === '/meals/:id') {
        const response = await idMealFetch(id);
        const objectApi = response.meals[0];
        setDataDetails(createObjectDetails(objectApi, true));
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeId(objectRecipeId(objectApi, path, ingredients, measures));
      } else if (path === '/drinks/:id') {
        const response = await idDrinkFetch(id);
        const objectApi = response.drinks[0];
        setDataDetails(createObjectDetails(objectApi, false));
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeId(objectRecipeId(objectApi, path, ingredients, measures));
      }
    };
    idFetchs();
  }, [id, path, setDataDetails, setRecipeId]);
  

  return (
    <main>
      < CardDetails params={ recipeId } />
      < Recomendation path={ path } />
    </main>
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
