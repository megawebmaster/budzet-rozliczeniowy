export const reduceBudgetType = (type, budget) => (
  budget.reduce((result, entry) => result + (entry[type].error.length === 0 ? entry[type].value : 0.0), 0.0)
);

export const upperFirst = (text) => (
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`
);
