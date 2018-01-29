export const reduceBudgetType = (type, budget) => (
  Object.keys(budget).reduce((result, categoryId) => result + budget[categoryId][type], 0.0)
);
