const TASK_COUNT = 8;
const TASK_MORE_COUNT = 8;
const tasks = [];
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
const filterAllElement = siteMainElement.querySelector(`.filter__all-count`);
const filterOverdueElement = siteMainElement.querySelector(`.filter__overdue-count`);
const filterTodayElement = siteMainElement.querySelector(`.filter__today-count`);
const filterFavoritesElement = siteMainElement.querySelector(`.filter__favorites-count`);
const filterRepeatingElement = siteMainElement.querySelector(`.filter__repeating-count`);
const filterTagsElement = siteMainElement.querySelector(`.filter__tags-count`);
const filterArchiveElement = siteMainElement.querySelector(`.filter__archive-count`);
renderComponent(siteMainElement, getBoardSection(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderComponent(boardElement, getSortingList(), `afterbegin`);
const newTask = getTask();
tasks.push(newTask);
renderComponent(taskListElement, makeEditTask(newTask), `beforeend`);

tasks.push(...(new Array(TASK_COUNT - 1)
  .fill(``)
  .map(getTask)));

const renderTasks = (container, count) => {
  container.insertAdjacentHTML(`beforeend`,
      tasks.slice(-count).map(makeTask)
    .join(``));
};

renderTasks(taskListElement, TASK_COUNT - 1);
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

const fillFiltersCount = ()=>{
  filterAllElement.textContent = tasks.length;
  filterOverdueElement.textContent = 0;
  filterTodayElement.textContent = tasks.filter(({dueDate})=>isToday(dueDate)).length;
  filterFavoritesElement.textContent = tasks.filter(({isFavorite})=>isFavorite).length;
  filterRepeatingElement.textContent = tasks.filter(({repeatingDays})=>Object.keys(repeatingDays).some((day) => repeatingDays[day])).length;
  filterTagsElement.textContent = tasks.filter(({tags})=>Array.from(tags).length).length;
  filterArchiveElement.textContent = tasks.filter(({isArchive})=>isArchive).length;
};

fillFiltersCount();

const buttonLoadMore = boardElement.querySelector(`.load-more`);
const buttonLoadMoreHandler = ()=>{
  tasks.push(...(new Array(TASK_MORE_COUNT)
    .fill(``)
    .map(getTask)));
  renderTasks(taskListElement, TASK_MORE_COUNT);
  fillFiltersCount();
};
buttonLoadMore.addEventListener(`click`, buttonLoadMoreHandler);
