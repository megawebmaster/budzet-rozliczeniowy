import { createSelector } from 'reselect';
import { month, year } from '../location';

export const expenses = (state) => state.expenses;
export const errors = (state) => state.expenses.errors;
export const isLoading = (state) => state.expenses.loading || state.categories.loading;

export const yearExpenses = createSelector(
  [expenses, year],
  (expenses, year) => expenses[year] || {}
);

export const monthExpenses = createSelector(
  [yearExpenses, month],
  (expenses, month) => expenses[month] || []
);
