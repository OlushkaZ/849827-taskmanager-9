const TASK_COUNT = 7;
const TASK_MORE_COUNT = 8;
import {getMenuSection} from './components/menu-section.js';
import {getSearchSection} from './components/search-section.js';
import {makeFilter} from './components/filter-section.js';
import {makeTask} from './components/task.js';
import {getBoardSection} from './components/board-section.js';
import {getSortingList} from './components/sorting-list.js';
import {makeEditTask} from './components/task-edit.js';
import {getLoadMoreButton} from './components/load-more-button.js';

import {getTask} from './data.js';
// import {tasks} from './data.js';
import {getFilter} from './data.js';

const renderComponent = (container, layout, target) => {
  container.insertAdjacentHTML(target, layout);
};
//
const siteMainElement = document.querySelector(`.main`);
const menuControl = siteMainElement.querySelector(`.main__control`);
renderComponent(menuControl, getMenuSection(), `beforeend`);
renderComponent(siteMainElement, getSearchSection(), `beforeend`);
renderComponent(siteMainElement, makeFilter(getFilter()), `beforeend`);
renderComponent(siteMainElement, getBoardSection(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderComponent(boardElement, getSortingList(), `afterbegin`);
renderComponent(taskListElement, makeEditTask(getTask()), `beforeend`);

const renderTasks = (container, count) => {
  const newTasks = new Array(count)
    .fill(``)
    .map(getTask)
    .map(makeTask)
    .join(``);
  // tasks.add(3);
  container.insertAdjacentHTML(`beforeend`, newTasks);
};

renderTasks(taskListElement, TASK_COUNT);
renderComponent(boardElement, getLoadMoreButton(), `beforeend`);

const buttonLoadMore = boardElement.querySelector(`.load-more`);
const buttonLoadMoreHandler = ()=>{
  renderTasks(taskListElement, TASK_MORE_COUNT);
  buttonLoadMore.classList.add(`visually-hidden`);
};
buttonLoadMore.addEventListener(`click`, buttonLoadMoreHandler);
