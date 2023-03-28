const filterNotNullValues = (values) => values.filter((value) => value !== '' && value !== null);

export const objectInProgress = (object, page, ingredients, measures) => {
  const name = page === 'meals' ? object.strMeal : object.strDrink;
  const image = page === 'meals' ? object.strMealThumb : object.strDrinkThumb;
  const category = page === 'meals' ? object.strCategory : object.strAlcoholic;

  return {
    name,
    image,
    category,
    instructions: object.strInstructions,
    ingredients: filterNotNullValues(Object.values(ingredients)),
    measures: filterNotNullValues(Object.values(measures)),
  };
};

export const objectRecipeId = (object, page, ingredients, measures) => {
  const thumb = page === '/meals/:id' ? object.strMealThumb : object.strDrinkThumb;
  const title = page === '/meals/:id' ? object.strMeal : object.strDrink;
  const category = page === '/meals/:id' ? object.strCategory : object.strAlcoholic;

  return {
    thumb,
    title,
    category,
    ingredient: filterNotNullValues(Object.values(ingredients)),
    measure: filterNotNullValues(Object.values(measures)),
    instruction: object.strInstructions,
    video: page === '/meals/:id' ? object.strYoutube : object.strVideo,
  };
};

export const objectDoneRecipe = (object, page) => {
  const id = page === 'meals' ? object.idMeal : object.idDrink;
  const type = page === 'meals' ? 'meal' : 'drink';
  const nationality = page === 'meals' ? object.strArea : '';
  const alcoholicOrNot = page === 'meals' ? '' : object.strAlcoholic;
  const name = page === 'meals' ? object.strMeal : object.strDrink;
  const image = page === 'meals' ? object.strMealThumb : object.strDrinkThumb;

  return {
    id,
    type,
    nationality,
    alcoholicOrNot,
    name,
    image,
    category: object.strCategory,
    doneDate: new Date(),
    tags: object.strTags ? object.strTags.split(',') : [],
  };
};
