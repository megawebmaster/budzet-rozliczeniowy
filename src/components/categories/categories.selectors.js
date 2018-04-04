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

const categories = (state) => state.categories;

const accessibleCategories = createSelector(
  [year, month, categories],
  (year, month, categories) => categories.filter(category => {
    const started = new Date(category.startedAt);
    const startMatched = started.getFullYear() <= year && started.getMonth() +1 <= month;
    const deleted = new Date(category.deletedAt);
    const deletionMatched = category.deletedAt === null || (
      deleted.getFullYear() >= year && deleted.getMonth() + 1 > month
    );

    return startMatched && deletionMatched;
  })
);

const yearCategories = createSelector(
  [year, categories],
  (year, categories) => categories.filter(category => {
    const started = new Date(category.startedAt);

    return started.getFullYear() === year && category.deletedAt === null;
  })
);

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

export const expenseCategory = createCachedSelector(
  accessibleCategories, categoryId,
  (categories, categoryId) => categories.find((c) => c.id === categoryId) || {}
)(
  (state, props) => `expense-category-${props.categoryId}`,
);
