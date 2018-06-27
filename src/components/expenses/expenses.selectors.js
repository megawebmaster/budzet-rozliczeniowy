import { createSelector } from 'reselect';
import { month, year } from '../location';
import { isRequirngPassword } from '../password-requirement';

export const expenses = (state) => state.expenses;
export const errors = (state) => state.expenses.errors;

export const yearExpenses = createSelector(
  [expenses, year],
  (expenses, year) => expenses[year] || {}
);

export const monthExpenses = createSelector(
  [yearExpenses, month],
  (expenses, month) => expenses[month] || []
);

const expensesLoading = (state) => state.expenses.loading;
const categoriesLoading = (state) => state.categories.loading;
export const isLoading = createSelector(
  [monthExpenses, expensesLoading, categoriesLoading, isRequirngPassword],
  (expenses, expensesLoading, categoriesLoading, requirePassword) =>
    !requirePassword && (expensesLoading || categoriesLoading)
);
