import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId, monthBudget } from '../budget/budget.selectors';

export const monthIncomeBudget = createSelector(
  [monthBudget],
  budget => budget.filter(entry => entry.type === 'income') || []
);

export const plannedIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'plan')
);
export const realIncome = createSelector(
  monthIncomeBudget, reduceBudgetType.bind(null, 'real')
);
export const categoryIncome = createCachedSelector(
  monthIncomeBudget, categoryId,
  (budget, categoryId) => budget.find(entry => entry.categoryId === categoryId) || {
    plan: { value: 0.0, error: '', saving: false },
    real: { value: 0.0, error: '', saving: false },
    type: 'income',
    categoryId: categoryId,
  }
)(
  (state, props) => `category-income-${props.categoryId}`,
);
