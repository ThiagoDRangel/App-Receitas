import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveLocalStorage, getLocalStorage } from '../helpers/saveLocalStorage';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardDetails(recipeId) {
  const { params: { category, ingredient,
    instruction, measure, title, thumb, video,
  } } = recipeId;
  const { dataDetails } = useContext(RecipesContext);
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [favorited, setFavorited] = useState(whiteHeart);
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  const idRecipe = pathname.split('/').pop();
  console.log(idRecipe);

  return (
    <main>Olá</main>
  );
}

export default CardDetails;