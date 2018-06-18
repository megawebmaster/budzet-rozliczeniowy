import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId, monthBudget } from '../budget/budget.selectors';
import { expensesCategories } from '../categories';

const reduceCategoryBudgetType = (type, budget, categoryIds) => (
  budget.reduce((result, entry) => (
    categoryIds.indexOf(entry.categoryId) > -1 ? result + entry[type].value : result
  ), 0.0)
);

export const monthExpensesBudget = createSelector(
  [monthBudget], budget => budget.filter(entry => entry.type === 'expense') || []
);

export const plannedExpenses = createSelector(
  monthExpensesBudget, reduceBudgetType.bind(null, 'plan')
);
export const realExpenses = createSelector(
  monthExpensesBudget, reduceBudgetType.bind(null, 'real')
);

export const expensesPlannedSummaries = createSelector(
  [monthExpensesBudget, expensesCategories], (budget, categories) => {
    const summaries = {};
    categories.forEach((category) => {
      const childrenIds = category.children.map((child) => child.id);
      summaries[category.id] = reduceCategoryBudgetType('plan', budget, childrenIds);
    });

    return summaries;
  }
);
export const expensesRealSummaries = createSelector(
  [monthExpensesBudget, expensesCategories], (budget, categories) => {
    const summaries = {};
    categories.forEach((category) => {
      const childrenIds = category.children.map((child) => child.id);
      summaries[category.id] = reduceCategoryBudgetType('real', budget, childrenIds);
    });

    return summaries;
  }
);

export const expensesTableCategories = createCachedSelector(
  expensesCategories, categoryId,
  (categories, categoryId) => (categories.find((c) => c.id === categoryId) || { children: [] }).children
)(
  (state, props) => `categories-${props.category.id}`,
);

export const expensesTablePlannedSummary = createCachedSelector(
  expensesPlannedSummaries, categoryId,
  (summaries, categoryId) => summaries[categoryId] || 0.0
)(
  (state, props) => `planned-summary-${props.categoryId}`,
);

export const expensesTableRealSummary = createCachedSelector(
  expensesRealSummaries, categoryId,
  (summaries, categoryId) => summaries[categoryId] || 0.0
)(
  (state, props) => `real-summary-${props.categoryId}`,
);

export const categoryExpenses = createCachedSelector(
  monthExpensesBudget, categoryId,
  (budget, categoryId) => budget.find(entry => entry.categoryId === categoryId) || {
    plan: { value: 0.0, error: '', saving: false },
    real: { value: 0.0, error: '', saving: false },
    type: 'expense',
    categoryId: categoryId,
  }
)(
  (state, props) => `category-expenses-${props.categoryId}`,
);
