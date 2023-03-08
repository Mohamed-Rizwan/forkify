import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  constructor() {
    super();
    this.addHandlerAddRecipe();
    this.addHandlerCloseRecipe();
  }
  togglehidden() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerAddRecipe() {
    this._btnOpen.addEventListener('click', this.togglehidden.bind(this));
  }
  addHandlerCloseRecipe() {
    this._btnClose.addEventListener('click', this.togglehidden.bind(this));
    this._overlay.addEventListener('click', this.togglehidden.bind(this));
  }

  addHandlerFormSubmit(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
