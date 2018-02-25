export const reduceBudgetType = (type, budget) => (
  Object.keys(budget).reduce((result, categoryId) => result + budget[categoryId][type], 0.0)
);

export const upperFirst = (text) => (
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`
);
