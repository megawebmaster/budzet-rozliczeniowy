import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { yearBudget, categoryId } from '../budget/budget.selectors';

export const monthIncomeBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.income[month] || {}
);

export const plannedIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'planned')
);
export const realIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'real')
);
export const categoryIncome = createCachedSelector(
  monthIncomeBudget, categoryId,
  (income, categoryId) => income[categoryId] || { planned: 0, savingPlanned: false, real: 0, savingReal: false }
)(
  (state, props) => `category-income-${props.categoryId}`,
);
