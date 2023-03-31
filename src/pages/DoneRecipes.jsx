import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { getLocalStorage } from '../helpers/saveLocalStorage';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    setRecipes(doneRecipes);
  }, []);

  const filterRecipe = (type) => {
    const doneRecipes = getLocalStorage('doneRecipes');
    let filtered;
  
    if (type === 'meal') {
      filtered = doneRecipes.filter((recipe) => recipe.type === 'meal');
    } else if (type === 'drink') {
      filtered = doneRecipes.filter((recipe) => recipe.type === 'drink');
    }
    
    setRecipes(filtered);
  };
  
  const handleShowAll = () => {
    const doneRecipes = getLocalStorage('doneRecipes');
    setRecipes(doneRecipes);
  }
  
  return (
    <main>
      <Header title="Done Recipes" />
      <section className="done-buttons">
        <button
          className="button-filter"
          onClick={handleShowAll}
          type="button"
        >
          All
        </button>
        <button
          className="button-filter"
          onClick={ () => filterRecipe('meal') }
        >
          Meals
        </button>
        <button
          className="button-filter"
          onClick={ () => filterRecipe('drink') }
          type="button"
        >
          Drinks
        </button>
      </section>
      <CardDoneRecipes done={recipes} />
    </main>
  );
}

export default DoneRecipes;
