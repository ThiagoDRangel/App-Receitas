import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [urlCopied, setUrlCopied] = useState(false);
  
  const onClickShare = () => {
    const URL = window.location.href;
    const TIMEOUT = 2000;
    copy(URL.replace('/favorite-recipes', ''));
    setUrlCopied(true);

    setTimeout(() => setUrlCopied(false), TIMEOUT);
  };

  return (
    <main>
      <Header title=" Favorite Recipes" />
      <button
        type="button"
      >
        All
      </button>
      <button
        type="button"
      >
        Meals
      </button>
      <button
        type="button"
      >
        Drinks
      </button>
      <button
        className="share-button"
        onClick={ () => onClickShare() }
      >
        <img
          alt="share Icon"
          className="icons"
          src={ shareIcon}
        />
      </button>
      {urlCopied && <p>Link copied!</p>}
    </main>
  );
}

export default FavoriteRecipes;
