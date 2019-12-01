import { createSelector } from 'reselect';
import { month, year } from '../location';
import createCachedSelector from 're-reselect';
import { categoryId } from '../budget/budget.selectors';

const parseChildrenCategories = (categories) => {
  const mainCategories = categories.filter(category => category.parent === null);
  mainCategories.forEach(category => {
    category.children = categories.filter(c => c.parent && c.parent.id === category.id);
  });
  return mainCategories;
};

const categories = (state) => state.categories.data;

const accessibleCategories = createSelector(
  [year, month, categories],
  (year, month, categories) => categories.filter(category => {
    const started = new Date(category.startedAt);
    const startMatched = category.startedAt === null || (
      started.getFullYear() <= year && started.getMonth() + 1 <= month
    );
    const deleted = new Date(category.deletedAt);
    const deletionMatched = category.deletedAt === null || (
      deleted.getFullYear() > year || deleted.getMonth() + 1 > month
    );

    return startMatched && deletionMatched;
  })
);

const yearCategories = createSelector(
  [year, categories],
  (year, categories) => categories.filter(category => {
    const started = new Date(category.startedAt);

    return (category.startedAt === null || started.getFullYear() === year) && category.deletedAt === null;
  })
);

const categoriesOfType = (state, type) => {
  return categories(state).filter(category => category.type === type);
};

export const findCategory = (state, id, name, type, parentId = null) => {
  const categories = categoriesOfType(state, type);

  return categories.find(category =>
    category.id !== id &&
    category.name === name &&
    (category.parent || {id: null}).id === parentId
  );
};

export const incomeCategories = createSelector(
  [accessibleCategories],
  (categories) => parseChildrenCategories(categories.filter(category => category.type === 'income'))
);
export const expensesCategories = createSelector(
  [accessibleCategories],
  (categories) => parseChildrenCategories(categories.filter(category => category.type === 'expense'))
);
export const irregularCategories = createSelector(
  [yearCategories],
  (categories) => parseChildrenCategories(categories.filter(category => category.type === 'irregular'))
);
export const savingsCategories = createSelector(
  [accessibleCategories],
  (categories) => parseChildrenCategories(categories.filter(category => category.type === 'saving'))
);

export const expenseCategory = createCachedSelector(
  accessibleCategories, categoryId,
  (categories, categoryId) => categories.find((c) => c.id === categoryId) || {}
)(
  (state, props) => `expense-category-${props.categoryId}`,
);
