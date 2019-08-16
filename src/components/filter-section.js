export const makeFilter = (filterList) => `
  <section class="main__filter filter container">

  ${filterList.map((filterItem) => `<input
    type="radio"
    id="filter__${filterItem.title}"
    class="filter__input visually-hidden"
    name="filter"
    ${filterItem.count === 0 ? `disabled` : ``}
  />
  <label for="filter__${filterItem.title}" class="filter__label">
    ${filterItem.title} <span class="filter__all-count">${filterItem.count}</span></label
  >`).join(``)}

  </section>
  `;
