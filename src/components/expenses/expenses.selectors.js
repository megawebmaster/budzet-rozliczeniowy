import { createSelector } from 'reselect';
import { month, year } from '../location';

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
const categoriesLoading = (state) =>
  state.categories.loading ||
  state.categories.data.some(category => category.encrypted)
;
export const isLoading = createSelector(
  [monthExpenses, expensesLoading, categoriesLoading],
  (expenses, expensesLoading, categoriesLoading) =>
    expensesLoading ||
    categoriesLoading ||
    expenses.some(expense => expense.encryptedPrice || expense.encryptedDescription)
);
