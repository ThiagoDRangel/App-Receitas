const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const ingredientMealsFetch = (ingredient) =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

export const nameMealsFetch = (name) =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

export const letterMealsFetch = (letter) =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).catch(() => {
    console.error("Your search must have only 1 (one) character");
    return undefined;
  });

export const allMealsFetch = () =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);

export const categoriesMealsFetch = () =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`).then((data) => data.meals);

export const categoryMealsFetch = (category) =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

export const idMealFetch = (id) =>
  fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  
  export const ingredientDrinksFetch = (ingredient) =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  
  export const nameDrinksFetch = (name) =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  
  export const letterDrinksFetch = (letter) =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).catch(() => {
      console.error("Your search must have only 1 (one) character");
      return undefined;
    });
  
  export const allDrinksFetch = () =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
  
  export const categoriesDrinksFetch = () =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`).then((data) => data.drinks);
  
  export const categoryDrinksFetch = (category) =>
    fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  
  