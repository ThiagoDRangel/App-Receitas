import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function CardRecipe() {
  const { recipes } = useContext(RecipesContext);
  const RECIPES_IN_SCREEN = 12;
  
  const mealsSlice = recipes?.meals?.slice(0, RECIPES_IN_SCREEN) || [];
  const drinksSlice = recipes?.drinks?.slice(0, RECIPES_IN_SCREEN) || [];
  return (
    <div className="cardrecipe">
  {recipes?.meals && (
    <>
      {mealsSlice.map((recipe, index) => (
        <Link to={`/meals/${recipe.idMeal}`} key={index}>
          <div className="card" data-testid={`${index}-recipe-card`}>
            <span data-testid={`${index}-card-name`}>{recipe.strMeal}</span>
            <img
              data-testid={`${index}-card-img`}
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
          </div>
        </Link>
      ))}
    </>
  )}
  {recipes?.drinks && (
    <>
      {drinksSlice.map((recipe, index) => (
        <Link to={`/drinks/${recipe.idDrink}`} key={index}>
          <div className="card" data-testid={`${index}-recipe-card`}>
            <span data-testid={`${index}-card-name`}>{recipe.strDrink}</span>
            <img
              data-testid={`${index}-card-img`}
              src={recipe.strDrinkThumb}
              alt={recipe.strDrink}
            />
          </div>
        </Link>
      ))}
    </>
  )}
</div>
  );
}

export default CardRecipe;
