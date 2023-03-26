import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Filters from '../components/Filters';
import { allMealsFetch } from '../services/fetchAPI';

function Meals() {
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const returnFetch = async () => {
      const recipes = await allMealsFetch();
      if(recipes) {
        setRecipes(recipes);
      } else {
        return global.alert(
          'Sorry, we haven\'t found any recipes for these filters.'
        );
      }
    };
    returnFetch();
  }, [setRecipes]);
  
  return (
    <section>
      <Header title="Meals" />
      <Filters title="Meals" />
      <Recipes />
      <Footer />
    </section>
  );
}

export default Meals;