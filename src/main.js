const TASK_COUNT = 8;
const TASK_MORE_COUNT = 8;
const tasks = [];
import {getMenuSection} from './components/menu-section.js';
import {getSearchSection} from './components/search-section.js';
import {Filter} from './components/filter-section.js';
import {Task} from './components/task.js';
import {getBoardSection} from './components/board-section.js';
import {getSortingList} from './components/sorting-list.js';
import {TaskEdit} from './components/task-edit.js';
import {getLoadMoreButton} from './components/load-more-button.js';

import {render} from './utils.js';
import {Position} from './utils.js';
import {getTask} from './data.js';
import {getFilter} from './data.js';

const renderComponent = (container, layout, target) => {
  container.insertAdjacentHTML(target, layout);
};

const taskMocks = new Array(TASK_COUNT)
  .fill(``)
  .map(getTask);
tasks.push(...taskMocks);

const siteMainElement = document.querySelector(`.main`);
const menuControl = siteMainElement.querySelector(`.main__control`);
renderComponent(menuControl, getMenuSection(), `beforeend`);
renderComponent(siteMainElement, getSearchSection(), `beforeend`);
const renderFilter = () => {
  const filter = new Filter(getFilter(), tasks);
  render(siteMainElement, filter.getElement(), Position.BEFOREEND);
};
renderFilter();
renderComponent(siteMainElement, getBoardSection(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
renderComponent(boardElement, getSortingList(), `afterbegin`);

const tasksContainer = siteMainElement.querySelector(`.board__tasks`);

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

taskMocks.forEach((taskMock) => renderTask(taskMock));
renderComponent(boardElement, getLoadMoreButton(), `beforeend`);

const buttonLoadMore = boardElement.querySelector(`.load-more`);
const buttonLoadMoreHandler = ()=>{
  const taskMoreMocks = new Array(TASK_MORE_COUNT)
    .fill(``)
    .map(getTask);
  tasks.push(...taskMocks);
  taskMoreMocks.forEach((taskMock) => renderTask(taskMock));
  const filter = new Filter(getFilter(), tasks);
  const filterElement = siteMainElement.querySelector(`.main__filter`);
  siteMainElement.replaceChild(filter.getElement(), filterElement);
};
buttonLoadMore.addEventListener(`click`, buttonLoadMoreHandler);
