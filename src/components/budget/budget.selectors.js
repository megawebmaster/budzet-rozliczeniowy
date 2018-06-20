import { createSelector } from 'reselect';
import { month, year } from '../location';
import { isRequirngPassword } from '../password-requirement';

export const budget = (state) => state.budget;
export const errors = (state) => state.budget.errors;
export const categoryId = (state, props) => props.category ? props.category.id : props.categoryId;

export const yearBudget = createSelector(
  [budget, year],
  (budget, year) => budget[year] || {}
);

export const monthBudget = createSelector(
  [yearBudget, month],
  (budget, month) => budget[month] || []
);

const budgetLoading = (state) => state.budget.loading;
const categoriesLoading = (state) =>
  state.categories.loading ||
  state.categories.data.some(category => category.encrypted)
;
export const isLoading = createSelector(
  [monthBudget, budgetLoading, categoriesLoading, isRequirngPassword],
  (budget, budgetLoading, categoriesLoading, requirePassword) =>
    !requirePassword && (
      budgetLoading || categoriesLoading || budget.some(entry => entry.plan.encrypted || entry.real.encrypted)
    )
);
