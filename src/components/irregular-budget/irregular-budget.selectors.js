import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { year } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId } from '../budget/budget.selectors';

export const irregularBudget = (state) => state.irregular_budget;

export const irregularYearBudget = createSelector(
  [irregularBudget, year], (budget, year) => budget[year] || {}
);

export const plannedIrregularExpenses = createSelector(
  irregularYearBudget, reduceBudgetType.bind(null, 'planned')
);
export const realIrregularExpenses = createSelector(
  irregularYearBudget, reduceBudgetType.bind(null, 'real')
);

export const categoryIrregularBudget = createCachedSelector(
  irregularYearBudget, categoryId,
  (budget, categoryId) => budget[categoryId] || { planned: 0, savingPlanned: false, real: 0 }
)(
  (state, props) => `category-irregular-budget-${props.categoryId}`,
);
