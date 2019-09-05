import {AbstractComponent} from './abstract-component.js';
export class TaskList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
