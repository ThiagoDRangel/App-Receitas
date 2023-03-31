import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/CardDoneRecipes.css';

function CardDoneRecipes(recipes) {
  const [urlCopied, setUrlCopied] = useState(false);
  const { done } = recipes;

  const onClickShare = (type, id) => {
    const TIMEOUT_MS = 2000;
    let url = window.location.href;
    
    if (type === 'meal') {
      url = url.replace('/done-recipes', `/meals/${id}`);
    } else if (type === 'drink') {
      url = url.replace('/done-recipes', `/drinks/${id}`);
    }
    copy(url);
    setUrlCopied(true); 
    setTimeout(() => {
      setUrlCopied(false);
    }, TIMEOUT_MS);
  };
  
  return (
    <main className="done-recipes">
      {done?.map(({
        alcoholicOrNot,
        category,
        doneDate,
        name,
        id,
        image,
        nationality,
        tags,
        type,
      }, index) => (
        <section
          key={ index }
          className="card-recipes"
        >
          <img
            alt={ index}
            className="card-recipes-img"
            src={ image }
          />
          <h3 className="natiOrCat">
            {nationality !== '' ? (
              <p>{`${nationality} - ${category}`}</p>
            ) : (
              <p>{category}</p>
            )}
          </h3>
          <p>
            {alcoholicOrNot !== '' && (
              <p>{alcoholicOrNot}</p>
            )}
          </p>
          <p>{name}</p>
          <p>{doneDate}</p>
          <p>
            {tags?.map((tag) => (
              <p key={ index }>{tag}</p>
            ))}
          </p>
          <button
            className="format-btn"
            onClick={ () => onClickShare(type, id) }
          >
            <img
              alt="Share Icon"
              className="icons"
              src={ shareIcon}
            />
          </button>
          <p>{urlCopied && <p>Link copied!</p>}</p>
        </section>
      ))}
    </main>
  );
}

export default CardDoneRecipes;