export const categoriesMealsFetch = async () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((d) => d.json()).then((r) => r.meals);

export const categoriesDrinksFetch = async () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((d) => d.json()).then((r) => r.drinks);

export const idDrinkFetch = async (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((d) => d.json()).then((r) => r);

export const idMealFetch = async (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((d) => d.json()).then((r) => r);

export const categoryMealsFetch = async (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((d) => d.json()).then((r) => r);

export const categoryDrinksFetch = async (category) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((d) => d.json()).then((r) => r);

export const letterMealsFetch = async (letter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((d) => d.json()).then((r) => r).catch(() => global.alert('Your search must have only 1 (one) character'));

export const letterDrinksFetch = async (letter) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then((d) => d.json()).then((r) => r).catch(() => global.alert('Your search must have only 1 (one) character'));

export const ingredientMealsFetch = async (ingredient) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const nameMealsFetch = async (name) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const nameDrinksFetch = async (name) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const ingredientDrinksFetch = async (ingredient) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const allMealsFetch = async () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const allDrinksFetch = async () => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((d) => d.json()).then((r) => r).catch(() => global.alert(''));
