import { createSelector } from 'reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { yearBudget } from '../budget/budget.selectors';
import { expensesCategories } from '../categories';

const reduceCategoryBudgetType = (type, budget, categoryIds) => (
  Object.keys(budget).reduce((result, categoryId) => (
    categoryIds.indexOf(categoryId) > -1 ? result + budget[categoryId][type] : result
  ), 0.0)
);

export const monthExpensesBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.expenses[month] || {}
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
