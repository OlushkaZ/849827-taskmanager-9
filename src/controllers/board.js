import {BoardSection} from '../components/board-section.js';
import {TaskList} from '../components/task-list.js';
// import {Task} from '../components/task.js';
// import {TaskEdit} from '../components/task-edit.js';
import {BoardNoTasks} from '../components/board-no-tasks.js';
import {SortingList} from '../components/sorting-list.js';
import {TaskController} from './task.js';
import {render, unrender, Position} from '../utils.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new BoardSection();
    this._taskList = new TaskList();
    this._boardNoTasks = new BoardNoTasks();
    this._sort = new SortingList();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    if (this._tasks.some(({isArchive})=>!isArchive)) {
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
      this._tasks.forEach((taskMock) => this._renderTask(taskMock));
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    } else {
      render(this._board.getElement(), this._boardNoTasks.getElement(), Position.BEFOREEND);
    }
  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}
