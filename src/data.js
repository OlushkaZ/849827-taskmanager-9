export const tasks = [];
export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() - 7 * 24 * 60 * 60 * 1000 + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': Boolean(Math.round(Math.random())),
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});
export const getFilter = () => ([
  {title: `all`, count: 0},
  {title: `overdue`, count: 0},
  {title: `today`, count: 0},
  {title: `favorites`, count: 0},
  {title: `repeating`, count: 0},
  {title: `tags`, count: 0},
  {title: `archive`, count: 0}
]);
