import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../styles/CardRecipe.css';

function CardRecipe() {
  const { recipes } = useContext(RecipesContext);
  const RECIPES_IN_SCREEN = 12;
  
  const mealsSlice = recipes?.meals?.slice(0, RECIPES_IN_SCREEN) || [];
  const drinksSlice = recipes?.drinks?.slice(0, RECIPES_IN_SCREEN) || [];
  return (
    <div className="card-recipe">
      {recipes?.meals && (
        <section className="container">
          {mealsSlice.map((recipe, index) => (
            <Link to={`/meals/${recipe.idMeal}`} key={index}>
              <div className="card">
                <span className="card-name">{recipe.strMeal}</span>
                <img
                  alt={recipe.strMeal}
                  className="image-meal"
                  src={recipe.strMealThumb}
                />
              </div>
            </Link>
          ))}
        </section>
      )}
      <section className="container-drinks">
        {recipes?.drinks && (
          <section className="container">
            {drinksSlice.map((recipe, index) => (
              <Link to={`/drinks/${recipe.idDrink}`} key={index}>
                <div className="card" data-testid={`${index}-recipe-card`}>
                  <span className="card-name">{recipe.strDrink}</span>
                  <img
                    alt={recipe.strDrink}
                    className="image-drink"
                    src={recipe.strDrinkThumb}
                  />
                </div>
              </Link>
            ))}
          </section>
        )}
      </section>
    </div>
  );
}

export default CardRecipe;
