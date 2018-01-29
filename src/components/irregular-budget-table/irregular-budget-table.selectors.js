import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { month } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId, yearBudget } from '../budget/budget.selectors';

export const monthIrregularBudget = createSelector(
  [yearBudget, month], (yearlyBudget, month) => yearlyBudget.irregular[month] || {}
);

export const plannedIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'planned')
);
export const realIrregular = createSelector(
  monthIrregularBudget, reduceBudgetType.bind(null, 'real')
);
export const categoryIrregular = createCachedSelector(
  monthIrregularBudget, categoryId,
  (irregular, categoryId) => irregular[categoryId] || { planned: 0, real: 0 }
)(
  (state, props) => `category-irregular-${props.categoryId}`,
);
