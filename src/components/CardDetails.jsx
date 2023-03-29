import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveLocalStorage, getLocalStorage } from '../helpers/saveLocalStorage';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/CardDetails.css';

function CardDetails(recipeId) {
  const { category, ingredient, instruction,
    measure, title, thumb, video,
  } = recipeId.params;
  const { dataDetails } = useContext(RecipesContext);
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [favorited, setFavorited] = useState(whiteHeart);
  const [you, setYou] = useState(video);
  const history = useHistory();
  const { pathname } = history.location;
  const SECONDS_TIMEOUT = 2000;
  const DRINK_REGEX = /drinks/;
  const URL = window.location.href;
  const idSplit = pathname.split('/').pop();

  const setRecipeStorage = () => {
    const object = getLocalStorage('inProgressRecipes') || { drinks: {}, meals: {} };
    const storageKey = DRINK_REGEX.test(pathname) ? 'drinks' : 'meals';
    object[storageKey][idSplit] = [...ingredient];
    saveLocalStorage('inProgressRecipes', object);
    const inProgressPath = DRINK_REGEX.test(pathname) ? `/drinks/${idSplit}/in-progress` : `/meals/${idSplit}/in-progress`;
    history.push(inProgressPath);
  };

  useEffect(() => {
    const inProgress = getLocalStorage('inProgressRecipes');
    const embedLink = video.replace('watch?v=', 'embed/');
    setYou(embedLink);
  
    if (!inProgress) {
      return;
    }
  
    const { drinks, meals } = inProgress;
    const isDrinkInProgress = drinks && Object.keys(drinks).includes(idSplit);
    const isMealInProgress = meals && Object.keys(meals).includes(idSplit);
  
    if (isDrinkInProgress || isMealInProgress) {
      setStartedRecipe(true);
    } else {
      setStartedRecipe(false);
    }
  }, [idSplit, video]);

  useEffect(() => {
    const favoriteStorage = getLocalStorage('favoriteRecipes');
    const inProgress = getLocalStorage('inProgressRecipes');
  
    if (!inProgress) {
      saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
    }
  
    if (!favoriteStorage) {
      saveLocalStorage('favoriteRecipes', []);
    }
  
    const favoriteRecipes = favoriteStorage || [];
    const isRecipeFavorited = favoriteRecipes.some((recipe) => recipe.id.includes(idSplit));
    setFavorited(isRecipeFavorited ? blackHeart : whiteHeart);
  }, [idSplit]);
  
  const onClickFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  
    const { id, type, nationality, alcoholicOrNot, name, image, category } = dataDetails;
  
    const newFavorite = { id, type, nationality, alcoholicOrNot, name, image, category };
  
    const isRecipeFavorited = favoriteRecipes.some((recipe) => recipe.id === id);
  
    if (!isRecipeFavorited) {
      const updatedFavorites = [...favoriteRecipes, newFavorite];
      saveLocalStorage('favoriteRecipes', updatedFavorites);
      setFavorited(blackHeart);
    } else {
      const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
      saveLocalStorage('favoriteRecipes', updatedFavorites);
      setFavorited(whiteHeart);
    }
  };

  const onCLickShare = () => {
    copy(URL);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), SECONDS_TIMEOUT);
  };
  
  return (
    <div className="details">
      <div className="info">
        <h1>{title}</h1>
        <img
          src={thumb}
          alt={thumb}
        />
      </div>
      <div className="container-icons">
        <button onClick={onClickFavorite}>
          <img
            className="icons"
            src={favorited}
            alt="iconFavorite"
          />
        </button>
        <button onClick={onCLickShare}>
          <img
            className="icons"
            src={shareIcon}
            alt="shareIcon"
          />
        </button>
      </div>
      {urlCopied && <p>Link copied!</p>}
      <p className="recipeCategory">{category}</p>
      <p className="titleCardDetails">Ingredients</p>
      <ul>
        {ingredient.map((info, index) => (
          <li key={index}>
            {`${info} ${measure[index] || ''}`}
          </li>
        ))}
      </ul>
      <div>
        <p className="titleCardDetails">Instructions</p>
        <p className="instructions">{instruction}</p>
      </div>
      <div className="container-video">
        <iframe
          className="iframe"
          title="video"
          width="420"
          height="345"
          src={ you }
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button
          className="button-start"
          type="button"
          onClick={() => {
            setRecipeStorage();
          }}
        >
          {startedRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
    </div>
  );
}

export default CardDetails;
