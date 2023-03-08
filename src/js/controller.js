import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import pagenationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipe from './views/addRecipe.js';

import 'core-js/stable';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Controller
const controlReceipe = async function () {
  try {
    // Getting Id Recipe after Id
    const id = window.location.hash.slice(1);

    //Gaurd Clause for No input
    if (!id) return;

    // spinner Loading ...
    recipeView.renderSpinner();

    // getting recipe from model
    await model.getRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state);

    //Render the recipe
    resultView.render(model.searchPage(model.state.page));

    //render bookmark
    bookmarkView.render(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    //load spinner
    resultView.renderSpinner();

    //getting input Value
    const inputSearch = searchView.getQuery();

    //clearing search value
    searchView.clear();

    // Gaurd Clause for no input
    if (!inputSearch) return;

    //get the search input
    await model.getSearchRecipe(inputSearch);

    //Render the recipe
    console.log(model.state.page);
    resultView.render(model.searchPage(model.state.page));

    //Pagination
    pagenationView.render(model.state.search.recipes);
  } catch (err) {
    resultView.renderError();
  }
};

const controlPagination = function (pageTo) {
  //Render the recipe
  resultView.render(model.searchPage(pageTo));

  //Pagination
  pagenationView.render(model.state.search.recipes);
};

const controlServings = function (servings) {
  model.state.servings = +servings;
  // Rendering Recipe
  recipeView.render(model.state);
};

const controlBookmark = function () {
  if (model.state.recipe.bookmarks) {
    model.removeBookmark(model.state.recipe);
  } else {
    model.addBookmark(model.state.recipe);
  }

  // Rendering Recipe
  recipeView.render(model.state);

  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarkLoad = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = function (data) {
  console.log(data);
  alert('Hacked');
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarkLoad);
  recipeView.addHandlerRender(controlReceipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookMarking(controlBookmark);
  searchView.addHandelerSearch(controlSearch);
  pagenationView.addHandlerClick(controlPagination);
  addRecipe.addHandlerFormSubmit(controlAddRecipe);
};

init();
