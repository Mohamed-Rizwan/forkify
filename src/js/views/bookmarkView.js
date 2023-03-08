import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _genarateMockup() {
    if (this._data.length == 0) {
      return `<div class="message">
           <div>
             <svg>
               <use href="src/img/icons.svg#icon-smile"></use>
             </svg>
           </div>
           <p>
             No bookmarks yet. Find a nice recipe and bookmark it :)
           </p>
         </div>`;
    }

    return this._data.map(res => this._genarateMockupPreview(res)).join(' ');
  }

  _genarateMockupPreview(res) {
    const id = window.location.hash.slice(1);
    return `
    <a class="preview__link ${
      id === res.id ? 'preview__link--active' : ''
    } " href="#${res.id}">
      <figure class="preview__fig">
        <img src=${res.image} alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
      </div>
    </a>
  `;
  }
}

export default new BookmarkView();
