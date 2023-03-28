import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveLocalStorage, getLocalStorage } from '../helpers/saveLocalStorage';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardDetails(recipeId) {
  console.log(recipeId);
  return (
    <main>Olá</main>
  );
}

export default CardDetails;