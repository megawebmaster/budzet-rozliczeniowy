import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { yearBudget, categoryId } from '../budget/budget.selectors';
import { expensesCategories } from '../categories';

const reduceCategoryBudgetType = (type, budget, categoryIds) => (
  Object.keys(budget).reduce((result, categoryId) => (
    categoryIds.indexOf(categoryId) > -1 ? result + budget[categoryId][type] : result
  ), 0.0)
);

export const monthExpensesBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.expense[month] || {}
);

export const plannedExpenses = createSelector(
  monthExpensesBudget, reduceBudgetType.bind(null, 'planned')
);
export const realExpenses = createSelector(
  monthExpensesBudget, reduceBudgetType.bind(null, 'real')
);

export const expensesPlannedSummaries = createSelector(
  [monthExpensesBudget, expensesCategories], (budget, categories) => {
    const summaries = {};
    categories.forEach((category) => {
      const childrenIds = category.children.map((child) => child.id.toString());
      summaries[category.id] =reduceCategoryBudgetType('planned', budget, childrenIds);
    });

    return summaries;
  }
);
export const expensesRealSummaries = createSelector(
  [monthExpensesBudget, expensesCategories], (budget, categories) => {
    const summaries = {};
    categories.forEach((category) => {
      const childrenIds = category.children.map((child) => child.id.toString());
      summaries[category.id] =reduceCategoryBudgetType('real', budget, childrenIds);
    });

    return summaries;
  }
);

export const expensesTableCategories = createCachedSelector(
  expensesCategories, categoryId,
  (categories, categoryId) => (categories.find((c) => c.id === categoryId) || { children: [] }).children
)(
  (state, props) => `categories-${props.categoryId}`,
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
  (expenses, categoryId) => expenses[categoryId] || { planned: 0, savingPlanned: false, real: 0 }
)(
  (state, props) => `category-expenses-${props.categoryId}`,
);
