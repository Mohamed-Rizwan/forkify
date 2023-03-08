import View from './view.js';
import icons from 'url:../../img/icons.svg';

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';

  _genarateMockup() {
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

export default new resultView();
