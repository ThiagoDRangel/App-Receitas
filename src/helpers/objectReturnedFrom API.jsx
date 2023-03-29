export const objectInProgress = (object, page, ingredients, measures) => {
  const { strMeal, strMealThumb, strCategory, strInstructions, strDrink, strDrinkThumb } = object;
  const { strAlcoholic } = object;
  const filteredIngredients = Object.values(ingredients).filter((value) => value !== '' && value !== null);
  const filteredMeasures = Object.values(measures).filter((value) => value !== '' && value !== null);

  const objectReturn = {
    name: page === 'meals' ? strMeal : strDrink,
    image: page === 'meals' ? strMealThumb : strDrinkThumb,
    category: page === 'meals' ? strCategory : strAlcoholic,
    instructions: strInstructions,
    ingredients: filteredIngredients,
    measures: filteredMeasures,
  };

  return objectReturn;
};

export const objectRecipeId = (object, page, ingredients, measures) => {
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = object;
  const { strDrinkThumb, strDrink, strAlcoholic, strVideo } = object;
  const filteredIngredients = Object.values(ingredients).filter(value => value && value !== '');
  const filteredMeasures = Object.values(measures).filter(value => value && value !== '');

  const objectReturn = {
    thumb: page === '/meals/:id' ? strMealThumb : strDrinkThumb,
    title: page === '/meals/:id' ? strMeal : strDrink,
    category: page === '/meals/:id' ? strCategory : strAlcoholic,
    ingredient: filteredIngredients,
    measure: filteredMeasures,
    instruction: strInstructions,
    video: page === '/meals/:id' ? strYoutube : strVideo,
  };

  return objectReturn;
};


export const objectDoneRecipe = (object, page) => {
  const { idMeal, strArea, strMealThumb, strCategory, strTags, strMeal, strDrink } = object;
  const { idDrink, strDrinkThumb, strAlcoholic } = object;

  const objectReturn = {
    id: page === 'meals' ? idMeal : idDrink,
    type: page === 'meals' ? 'meal' : 'drink',
    nationality: page === 'meals' ? strArea : '',
    alcoholicOrNot: page === 'meals' ? '' : strAlcoholic,
    name: page === 'meals' ? strMeal : strDrink,
    image: page === 'meals' ? strMealThumb : strDrinkThumb,
    category: strCategory,
    doneDate: new Date(),
    tags: strTags ? strTags.split(',') : [],
  };

  return objectReturn;
};
