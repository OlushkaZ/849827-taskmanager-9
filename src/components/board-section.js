import {AbstractComponent} from './abstract-component.js';
export class BoardSection extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="board container">
    <div class="board__tasks"></div>
  </section>`;
  }
}
