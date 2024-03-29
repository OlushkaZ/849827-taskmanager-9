export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const Key = {
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`
};

export const createElement = (template)=>{
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place)=>{
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element)=>{
  if (element) {
    element.remove();
    // element.removeElement();
  }
};
