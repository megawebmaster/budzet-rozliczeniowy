import { createSelector } from 'reselect';
import { month, year } from '../location';

export const budget = (state) => state.budget;
export const errors = (state) => state.budget.errors;
export const isLoading = (state) => state.budget.loading || state.categories.loading;
export const categoryId = (state, props) => props.category ? props.category.id : props.categoryId;

export const yearBudget = createSelector(
  [budget, year],
  (budget, year) => budget[year] || {}
);

export const monthBudget = createSelector(
  [yearBudget, month],
  (budget, month) => budget[month] || []
);
