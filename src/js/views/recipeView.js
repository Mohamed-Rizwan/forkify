import icons from 'url:../../img/icons.svg';
import View from './View';
import * as model from '../model.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No recipes found for your query. Please try again!';

  _genarateMockup() {
    return `
    <figure class="recipe__fig">
      <img src=${this._data.recipe.image} alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.recipe.title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">45</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          model.state.servings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button data-servings=${
            model.state.servings - 1
          } class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings"  data-servings=${
            model.state.servings + 1
          }>
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.recipe.bookmarks ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.recipe.ingredients
        .map(ings => this._generateMockUpIngredient(ings))
        .join(' ')}
        
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href=${this._data.recipe.sourceUrl}
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  _generateMockUpIngredient(ings) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity"></div>
    <div class="recipe__description">
      <span class="recipe__unit"></span>
      ${ings}
    </div>
  </li>`;
  }

  addHandlerRender(controlReceipe) {
    window.addEventListener('hashchange', controlReceipe);
    window.addEventListener('load', controlReceipe);
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');

      //gaurd clause
      if (!btn) return;
      const servings = btn.dataset.servings;
      if (servings <= 0) return;
      handler(servings);
    });
  }

  addHandlerBookMarking(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();
