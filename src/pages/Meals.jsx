import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Meals() {
  const { setRecipes } = useContext(RecipesContext);
  return (
    <section>
      <h1>Comidas</h1>
      <Header title="Meals" />
    </section>
  );
}

export default Meals;