import { createSelector } from 'reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { yearBudget } from '../budget/budget.selectors';

export const monthIrregularBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.irregular[month] || {}
);

export const plannedIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'planned')
);
export const realIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'real')
);
