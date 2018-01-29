import { createSelector } from 'reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { yearBudget } from '../budget/budget.selectors';

export const monthIncomeBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.income[month] || {}
);

export const plannedIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'planned')
);
export const realIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'real')
);
