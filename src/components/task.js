import {createElement} from '../utils.js';
export class Task {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
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
  static getDate(dueDate) {
    return dueDate.toDateString();
  }
  static getHours(dueDate) {
    return dueDate.getHours();
  }
  static getMinutes(dueDate) {
    return dueDate.getMinutes();
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
              <p class="card__text">${this._description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${Task.getDate(this._dueDate)}
                  </span>
                  <span class="card__time">${Task.getHours(this._dueDate)}
                  :${Task.getMinutes(this._dueDate)}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${(Array.from(this._tags).map((tag) => (`
                <span class="card__hashtag-inner">
                <input type = "hidden" name = "hashtag" value = "${tag}" class = "card__hashtag-hidden-input" />
                <button type = "button" class="card__hashtag-name">#${tag}</button>
                <button type = "button" class="card__hashtag-delete">delete</button>
                </span>`.trim()
  ))).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </article>`;
  }
}
