import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId, monthBudget } from '../budget/budget.selectors';

export const monthSavingsBudget = createSelector(
  [monthBudget],
  budget => budget.filter(entry => entry.type === 'saving') || []
);

export const plannedSavings = createSelector(
  monthSavingsBudget, reduceBudgetType.bind(null, 'plan')
);
export const realSavings = createSelector(
  monthSavingsBudget, reduceBudgetType.bind(null, 'real')
);
export const categorySavings = createCachedSelector(
  monthSavingsBudget, categoryId,
  (budget, categoryId) => budget.find(entry => entry.categoryId === categoryId) || {
    plan: { value: 0.0, error: '', saving: false },
    real: { value: 0.0, error: '', saving: false },
    type: 'saving',
    categoryId: categoryId,
  }
)(
  (state, props) => `category-saving-${props.categoryId}`,
);
