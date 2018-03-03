import { createSelector } from 'reselect';
import { year } from '../location';

export const budget = (state) => state.budget;
export const isLoading = (state) => state.budget.loading;
export const categoryId = (state, props) => props.categoryId;

export const yearBudget = createSelector(
  [budget, year],
  (budget, year) => budget[year] || { income: {}, expense: {}, irregular: {} }
);
