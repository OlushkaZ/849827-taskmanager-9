import {getMenuSection} from './components/menu-section.js';
import {getSearchSection} from './components/search-section.js';
import {getFilterSection} from './components/filter-section.js';
import {getCardForm} from './components/card-form.js';
import {getBoardSection} from './components/board-section.js';
import {getSortingList} from './components/sorting-list.js';
import {getCardEditForm} from './components/card-edit-form.js';
import {getLoadMoreButton} from './components/load-more-button.js';

const renderComponent = (container, layout, target) => {
  container.insertAdjacentHTML(target, layout);
};

const siteMainElement = document.querySelector(`.main`);
const menuControl = siteMainElement.querySelector(`.main__control`);
renderComponent(menuControl, getMenuSection(), `beforeend`);
renderComponent(siteMainElement, getSearchSection(), `beforeend`);
renderComponent(siteMainElement, getFilterSection(), `beforeend`);
renderComponent(siteMainElement, getBoardSection(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

renderComponent(boardElement, getSortingList(), `afterbegin`);
renderComponent(taskListElement, getCardEditForm(), `beforeend`);
new Array(3).fill(``).forEach(() => renderComponent(taskListElement, getCardForm(), `beforeend`));

renderComponent(boardElement, getLoadMoreButton(), `beforeend`);
