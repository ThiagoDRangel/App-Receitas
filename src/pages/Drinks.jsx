import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import { allDrinksFetch } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchAPI = async () => {
      const recipes = await allDrinksFetch();
      if(recipes) {
        setRecipes(recipes);
      }
    };
    fetchAPI();
  }, [setRecipes]);
  return (
    <main>
      <Header title="Drinks" />
      <Filters title="Drinks" />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Drinks;
