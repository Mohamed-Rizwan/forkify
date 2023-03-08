import View from './view.js';
import * as model from '../model.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _recipes = model.state.search;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      handler(btn.dataset.page);
    });
  }

  _genarateMockup() {
    const currPage = +model.state.page;
    const totalPages = +Math.ceil(
      this._recipes.recipes.length / this._recipes.totalItems
    );

    //page 1 and has more Pages
    if (currPage === 1 && totalPages > 1) {
      return `
      <button data-page=${
        currPage + 1
      } class="btn--inline pagination__btn--next">
         <span>Page ${currPage + 1}</span>
         <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
         </svg>
      </button>`;
    }
    //Last Page
    if (currPage === totalPages && currPage !== 1) {
      return `
      <button data-page=${
        currPage - 1
      } class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
      </svg>
     <span>Page ${currPage - 1}</span>
    </button>`;
    }

    //only one page
    if (currPage === 1 && totalPages === 1) {
      return '';
    }
    //others
    return `
    <button data-page=${currPage - 1} class="btn--inline pagination__btn--prev">
     <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
     </svg>
    <span>Page ${currPage - 1}</span>
   </button>
  <button data-page=${currPage + 1} class="btn--inline pagination__btn--next">
    <span>Page ${currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
}

export default new PaginationView();
