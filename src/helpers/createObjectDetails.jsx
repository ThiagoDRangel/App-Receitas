export const createObjectDetails = (object, param) => {
  const {
    strMeal = '',
    strArea = '',
    idMeal = '',
    strCategory = '',
    strMealThumb = '',
    strDrink = '',
    idDrink = '',
    strDrinkThumb = '',
    strAlcoholic = ''
  } = object;
  
  const filteredObject = {
    name: param ? strMeal : strDrink,
    nationality: param ? strArea : '',
    id: param ? idMeal : idDrink,
    category: strCategory,
    image: param ? strMealThumb : strDrinkThumb,
    type: param ? 'meal' : 'drink',
    alcoholicOrNot: param ? '' : strAlcoholic,
  };
  
  return { ...filteredObject };
};
