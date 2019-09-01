const TASK_COUNT = 8;
const TASK_MORE_COUNT = 8;
const tasks = [];
import {MenuSection} from './components/menu-section.js';
import {SearchSection} from './components/search-section.js';
import {Filter} from './components/filter-section.js';
import {Task} from './components/task.js';
import {BoardSection} from './components/board-section.js';
import {BoardEmptySection} from './components/board-empty-section.js';
import {SortingList} from './components/sorting-list.js';
import {TaskEdit} from './components/task-edit.js';
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

const renderBoardSection = () => {
  if (tasks.some(({isArchive})=>!isArchive)) {
    const boardSection = new BoardSection();
    render(siteMainElement, boardSection.getElement(), Position.BEFOREEND);
  } else {
    const boardEpmtySection = new BoardEmptySection();
    render(siteMainElement, boardEpmtySection.getElement(), Position.BEFOREEND);
  }
};
renderBoardSection();

const boardElement = siteMainElement.querySelector(`.board`);
const renderSortingList = () => {
  const sortingList = new SortingList();
  render(boardElement, sortingList.getElement(), Position.AFTERBEGIN);
};
renderSortingList();

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
  .querySelector(`.card__form`)
  .addEventListener(`submit`, ()=>{
    tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

if (tasksContainer) {
  taskMocks.forEach((taskMock) => renderTask(taskMock));
}

const renderLoadMoreButton = () => {
  const loadMoreButton = new LoadMoreButton();
  render(boardElement, loadMoreButton.getElement(), Position.BEFOREEND);
};
renderLoadMoreButton();

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
