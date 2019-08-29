const TASK_COUNT = 8;
// const TASK_MORE_COUNT = 8;
const tasks = [];
import {getMenuSection} from './components/menu-section.js';
import {getSearchSection} from './components/search-section.js';
import {makeFilter} from './components/filter-section.js';
import {Task} from './components/task.js';
import {getBoardSection} from './components/board-section.js';
import {getSortingList} from './components/sorting-list.js';
import {TaskEdit} from './components/task-edit.js';
import {getLoadMoreButton} from './components/load-more-button.js';

import {render} from './utils.js';
import {Position} from './utils.js';
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
const filterAllElement = siteMainElement.querySelector(`.filter__all-count`);
const filterOverdueElement = siteMainElement.querySelector(`.filter__overdue-count`);
const filterTodayElement = siteMainElement.querySelector(`.filter__today-count`);
const filterFavoritesElement = siteMainElement.querySelector(`.filter__favorites-count`);
const filterRepeatingElement = siteMainElement.querySelector(`.filter__repeating-count`);
const filterTagsElement = siteMainElement.querySelector(`.filter__tags-count`);
const filterArchiveElement = siteMainElement.querySelector(`.filter__archive-count`);
renderComponent(siteMainElement, getBoardSection(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
renderComponent(boardElement, getSortingList(), `afterbegin`);

const tasksContainer = siteMainElement.querySelector(`.board__tasks`);
// const newTask = getTask();
// tasks.push(newTask);
// renderComponent(taskListElement, makeEditTask(newTask), `beforeend`);

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

const taskMocks = new Array(TASK_COUNT)
  .fill(``)
  .map(getTask);

tasks.push(...taskMocks);

// const renderTasks = (container, count) => {
//   container.insertAdjacentHTML(`beforeend`,
//       tasks.slice(-count).map(makeTask)
//     .join(``));
// };

// renderTasks(taskListElement, TASK_COUNT - 1);
taskMocks.forEach((taskMock) => renderTask(taskMock));
renderComponent(boardElement, getLoadMoreButton(), `beforeend`);

const isToday = (date)=>{
  const taskDate = new Date(date);
  const today = new Date();
  if ((today.getFullYear() === taskDate.getFullYear()) && (today.getMonth() === taskDate.getMonth()) && (today.getDate() === taskDate.getDate())) {
    return true;
  } else {
    return false;
  }
};

const isOverdue = (date)=>{
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
  const taskDate = new Date(date).valueOf();
  return taskDate < today;
};

const fillFiltersCount = ()=>{
  filterAllElement.textContent = tasks.length;
  filterOverdueElement.textContent = tasks.filter(({dueDate})=>isOverdue(dueDate)).length;
  filterTodayElement.textContent = tasks.filter(({dueDate})=>isToday(dueDate)).length;
  filterFavoritesElement.textContent = tasks.filter(({isFavorite})=>isFavorite).length;
  filterRepeatingElement.textContent = tasks.filter(({repeatingDays})=>Object.keys(repeatingDays).some((day) => repeatingDays[day])).length;
  filterTagsElement.textContent = tasks.filter(({tags})=>Array.from(tags).length).length;
  filterArchiveElement.textContent = tasks.filter(({isArchive})=>isArchive).length;
};

fillFiltersCount();

const buttonLoadMore = boardElement.querySelector(`.load-more`);
const buttonLoadMoreHandler = ()=>{
  // tasks.push(...(new Array(TASK_MORE_COUNT)
  //   .fill(``)
  //   .map(getTask)));
  // renderTasks(taskListElement, TASK_MORE_COUNT);
  // fillFiltersCount();
};
buttonLoadMore.addEventListener(`click`, buttonLoadMoreHandler);
