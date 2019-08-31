import {createElement} from '../utils.js';
export class Filter {
  constructor(filterList, tasks) {
    this._filterList = filterList;
    this._tasks = tasks;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static isOverdue(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    const taskDate = new Date(date).valueOf();
    return taskDate < today;
  }

  static isToday(date) {
    const taskDate = new Date(date);
    const today = new Date();
    if ((today.getFullYear() === taskDate.getFullYear()) && (today.getMonth() === taskDate.getMonth()) && (today.getDate() === taskDate.getDate())) {
      return true;
    } else {
      return false;
    }
  }

  static getCount(title, tasks) {
    switch (title) {
      case `all`:
        return tasks.length;
      case `overdue`:
        return tasks.filter(({dueDate})=>Filter.isOverdue(dueDate)).length;
      case `today`:
        return tasks.filter(({dueDate})=>Filter.isToday(dueDate)).length;
      case `favorites`:
        return tasks.filter(({isFavorite})=>isFavorite).length;
      case `repeating`:
        return tasks.filter(({repeatingDays})=>Object.keys(repeatingDays).some((day) => repeatingDays[day])).length;
      case `tags`:
        return tasks.filter(({tags})=>Array.from(tags).length).length;
      case `archive`:
        return tasks.filter(({isArchive})=>isArchive).length;
      default: return false;
    }
  }

  getTemplate() {
    return `<section class="main__filter filter container">
  ${this._filterList.map((filterItem) => `<input
    type="radio"
    id="filter__${filterItem.title}"
    class="filter__input visually-hidden"
    name="filter"
    ${filterItem.count === 0 ? `disabled` : ``}
  />
  <label for="filter__${filterItem.title}" class="filter__label">
    ${filterItem.title} <span class="filter__${filterItem.title}-count">${Filter.getCount(filterItem.title, this._tasks)}</span></label
  >`).join(``)}

  </section>`;
  }

}
