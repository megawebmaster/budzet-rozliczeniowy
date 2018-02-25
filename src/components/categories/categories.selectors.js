// import createSelector from 'reselect';

const parseChildrenCategories = (categories) => {
  const mainCategories = categories.filter(category => category.parent === null);
  mainCategories.forEach(category => {
    category.children = categories.filter(c => c.parent && c.parent.id === category.id);
  });
  return mainCategories;
};

// TODO: Add support for year and month!
export const incomeCategories = (state) => (
  parseChildrenCategories(state.categories.filter(category => category.type === 'income'))
);
export const expensesCategories = (state) => (
  parseChildrenCategories(state.categories.filter(category => category.type === 'expense'))
);
export const irregularCategories = (state) => (
  parseChildrenCategories(state.categories.filter(category => category.type === 'irregular'))
);

