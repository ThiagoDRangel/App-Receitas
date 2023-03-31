import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import iconShare from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { idDrinkFetch, idMealFetch } from '../services/fetchAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/saveLocalStorage';
import RecipesContext from '../context/RecipesContext';
import { createObjectDetails } from '../helpers/createObjectDetails';
import { objectDoneRecipe, objectInProgress } from '../helpers/objectReturnedFromAPI';

function RecipeInProgress() {
  const { dataDetails, setDataDetails } = useContext(RecipesContext);
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [favorited, setFavorited] = useState(whiteHeart);
  const [disabled, setDisabled] = useState(true);
  const [urlCopied, setUrlCopied] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState({
    ingredients: [], measures: [] });

  const history = useHistory();
  const { pathname } = history.location;
  const idSplit = pathname.split('/')[2];
  const STR_INGREDIENT = /strIngredient\d+/;
  const STR_MEASURE = /srtMeasure\d+/;
  const URL = window.location.href;
  const page = pathname.split('/')[1];
  const maxIngredients = {};

  const filterKeys = (object, param) => 
    Object.fromEntries(Object.entries(object)
      .filter(([key]) => param.test(key)));

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await (page === 'meals' ? idMealFetch(idSplit) : idDrinkFetch(idSplit));
      const objectApi = response[page][0];
      setDataDetails(createObjectDetails(objectApi, page === 'meals'));
      setDoneRecipe(objectApi);
      const ingredients = filterKeys(objectApi, STR_INGREDIENT);
      const measures = filterKeys(objectApi, STR_MEASURE);
      setRecipeInProgress(objectInProgress(objectApi, page, ingredients, measures));
    };
    fetchAPI();
  }, []);
  
  recipeInProgress.ingredients.forEach((ingredient, index) =>
    maxIngredients[index] = '');
  const [checked, setChecked] = useState(maxIngredients);
  
  const saveIngredients = (object, actualPage, value) => {
    object[actualPage][idSplit] = [...(object[actualPage][idSplit] || []), value];
    saveLocalStorage('inProgressRecipes', { ...object });
  };
  
  const onChangeChecked = (target, index) => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    const object = { ...checked, [index]: target.checked ? 'checked' : '' };
    setChecked(object);
    setDisabled(!Object.values(object).every((check) => check === 'checked'));
    saveIngredients(inProgressRecipes, page, target.value);
  };
  
  const onClickFavorite = () => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes') || [];
    const { id, type, nationality, alcoholicOrNot, name, image, category } = dataDetails;
    const newFavorite = { id, type, nationality, alcoholicOrNot, name, image, category };
    const favoriteIndex = favoriteRecipes.findIndex((recipe) => recipe.id === id);
  
    if (favoriteIndex === -1) {
      saveLocalStorage('favoriteRecipes', [...favoriteRecipes, newFavorite]);
      setFavorited(blackHeart);
    } else {
      saveLocalStorage('favoriteRecipes', favoriteRecipes.filter((recipe) => recipe.id !== id));
      setFavorited(whiteHeart);
    }
  };
  
  const onCLickShare = () => {
    const TIME_SHARE = 2000;
    const urlInProgress = URL.replace('/in-progress', '');
    copy(urlInProgress);
    setUrlCopied(true);
    setTimeout(() => {
      setUrlCopied(false);
    }, TIME_SHARE);
  };

  const onClickButton = () => {
    saveLocalStorage(
      'doneRecipes',
      [...getLocalStorage('doneRecipes'),
      objectDoneRecipe(doneRecipe, page)]
    );
    history.push('/done-recipes');
  };
  const { image, category, name, instructions, ingredients, measures } = recipeInProgress;
  return (
    
    <main className="recipe-progress">
      <h1>Recipe in progress</h1>
      <span>{name}</span>
      <img
        alt="Selected Recipe"
        className="selected-recipe"
        src={ image }
      />
       <section className="icons">
        <button onClick={ () => onClickFavorite() }>
          <img
            alt="Favorite Recipe"
            className="favorite-btn"
            src={ favorited }
          />
        </button>
        <button onClick={ () => onCLickShare() }>
          <img
            alt="Share Recipe"
            className="share-btn"
            src={ iconShare }
          />
        </button>
        {urlCopied && <span>Link copied!</span>}
      </section>
      <section>
        <p>{category}</p>
        <h2 className="instructions">
          <p><strong>Modo de preparo:</strong></p>
          {instructions}
        </h2>
      </section>
      <section className="ingredients-input">
        {ingredients.map((ingredient, index) => (
          <label
            className={ checked[index] }
            key={ index}
          >
            <input
              checked={ checked[index] === 'checked' }
              onChange={ ({ target }) => onChangeChecked(target, index) }
              type="checkbox"
              value={ ingredient }
            />
            <span>{`${ingredient} ${measures[index] ? measures[index] : ''}`}</span>
          </label>
        ))}
      </section>
      <section>
        <button
          className="finish-btn"
          disabled={ disabled }
          onClick={ () => onClickButton() }
        >
          Finalizar Receita
        </button>
      </section>
    </main>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;