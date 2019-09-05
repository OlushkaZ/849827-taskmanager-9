const TASK_COUNT = 8;
// const TASK_MORE_COUNT = 8;
const tasks = [];
import {MenuSection} from './components/menu-section.js';
import {SearchSection} from './components/search-section.js';
import {Filter} from './components/filter-section.js';
import {BoardController} from './controllers/board.js';
import {LoadMoreButton} from './components/load-more-button.js';

import {render} from './utils.js';
import {Position} from './utils.js';
import {getTask} from './data.js';
import {getFilter} from './data.js';

const taskMocks = new Array(TASK_COUNT)
  .fill(``)
  .map(getTask);
tasks.push(...taskMocks);

const siteMainElement = document.querySelector(`.main`);
const menuControl = siteMainElement.querySelector(`.main__control`);

const renderMenuSection = () => {
  const menuSection = new MenuSection();
  render(menuControl, menuSection.getElement(), Position.BEFOREEND);
};
renderMenuSection();

const renderSearchSection = () => {
  const searchSection = new SearchSection();
  render(siteMainElement, searchSection.getElement(), Position.BEFOREEND);
};
renderSearchSection();

const renderFilter = () => {
  const filter = new Filter(getFilter(), tasks);
  render(siteMainElement, filter.getElement(), Position.BEFOREEND);
};
renderFilter();

const boardController = new BoardController(siteMainElement, taskMocks);
boardController.init();

const boardElement = siteMainElement.querySelector(`.board`);

const renderLoadMoreButton = () => {
  const loadMoreButton = new LoadMoreButton();
  render(boardElement, loadMoreButton.getElement(), Position.BEFOREEND);
};
renderLoadMoreButton();
