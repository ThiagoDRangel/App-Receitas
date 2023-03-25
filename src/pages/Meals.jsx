import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { setRecipes } = useContext(RecipesContext);
  return (
    <section>
      <h1>Comidas</h1>
    </section>
  );
}

export default Meals;