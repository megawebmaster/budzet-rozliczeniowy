import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { year } from '../location';
import { reduceBudgetType } from '../budget/budget.helpers';
import { categoryId } from '../budget/budget.selectors';

export const irregularBudget = (state) => state.irregular_budget;
export const errors = (state) => state.irregular_budget.errors;
export const isLoading = (state) => state.irregular_budget.loading;

export const irregularYearBudget = createSelector(
  [irregularBudget, year], (budget, year) => budget[year] || []
);

export const plannedIrregularExpenses = createSelector(
  irregularYearBudget, reduceBudgetType.bind(null, 'plan')
);
export const realIrregularExpenses = createSelector(
  irregularYearBudget, reduceBudgetType.bind(null, 'real')
);

export const categoryIrregularBudget = createCachedSelector(
  irregularYearBudget, categoryId,
  (budget, categoryId) => budget.find(entry => entry.categoryId === categoryId) || {
    plan: { value: 0.0, error: '', saving: false },
    real: { value: 0.0, error: '', saving: false },
    type: 'irregular',
    categoryId: categoryId,
  }
)(
  (state, props) => `category-irregular-budget-${props.categoryId}`,
);
// export const categoryIrregularBudget = createCachedSelector(
//   irregularYearBudget, categoryId,
//   (budget, categoryId) => budget[categoryId] || { planned: 0, savingPlanned: false, errorPlanned: '', real: 0, monthlyRealValues: [] }
// )(
//   (state, props) => `category-irregular-budget-${props.categoryId}`,
// );
