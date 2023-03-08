import { async } from 'regenerator-runtime';
import { API_URL, PAGINATION } from './config';
import { getJson, sendJSON } from './helper.js';

export const state = {
  recipe: {},
  search: { query: '', recipes: [], totalItems: PAGINATION },
  page: 1,
  servings: 4,
  bookmarks: [],
};

export const getRecipe = async function (id) {
  try {
    //fetch data from API
    const data = await getJson(`${API_URL}get?rId=${id}`);
    let { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(res => res.id === id)) {
      state.recipe.bookmarks = true;
    } else {
      state.recipe.bookmarks = false;
    }
  } catch (err) {
    throw err;
  }
};

export const getSearchRecipe = async function (item) {
  try {
    const data = await getJson(`${API_URL}search?q=${item}`);
    state.search.recipes = data.recipes.map(res => {
      return {
        id: res.recipe_id,
        title: res.title,
        publisher: res.publisher,
        sourceUrl: res.source_url,
        image: res.image_url,
      };
    });
    state.search.query = item;
    state.page = 1;
  } catch (err) {
    throw err;
  }
};

export const searchPage = function (page = 1) {
  const start = (page - 1) * state.search.totalItems;
  const end = page * state.search.totalItems;
  state.page = page;
  return state.search.recipes.slice(start, end);
};

export const updateServing = function (newservings) {
  state.recipe.ingredients.forEach(ing => console.log(ing));
  state.servings = newservings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (state.recipe.id === recipe.id) state.recipe.bookmarks = true;

  persistBookmarks();
};

export const removeBookmark = function (recipe) {
  const index = state.bookmarks.findIndex(res => res.id === recipe.id);
  state.bookmarks.pop(index);
  if (state.recipe.id === recipe.id) state.recipe.bookmarks = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
