import { createSelector } from 'reselect';
import { month, year } from '../location';

export const expenses = (state) => state.expenses;
export const isLoading = (state) => state.expenses.loading;

export const yearExpenses = createSelector(
  [expenses, year],
  (expenses, year) => expenses[year] || []
);

export const monthExpenses = createSelector(
  [yearExpenses, month],
  (expenses, month) => expenses[month] || []
);
