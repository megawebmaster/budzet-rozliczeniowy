import { createSelector } from 'reselect';
import { year } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';

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
