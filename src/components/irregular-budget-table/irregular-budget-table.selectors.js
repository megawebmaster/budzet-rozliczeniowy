import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId, monthBudget } from '../budget/budget.selectors';

export const monthIrregularBudget = createSelector(
  [monthBudget], budget => budget.filter(entry => entry.type === 'irregular') || []
);

export const plannedIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'plan')
);
export const realIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'real')
);
export const categoryIrregular = createCachedSelector(
  monthIrregularBudget, categoryId,
  (budget, categoryId) => budget.find(entry => entry.categoryId === categoryId) || {
    plan: { value: 0.0, error: '', saving: false },
    real: { value: 0.0, error: '', saving: false },
    type: 'irregular',
    categoryId: categoryId,
  }
)(
  (state, props) => `category-irregular-${props.categoryId}`,
);
