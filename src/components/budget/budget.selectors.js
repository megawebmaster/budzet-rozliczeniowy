import { createSelector } from 'reselect';
import { year } from '../location';

export const budget = (state) => state.budget;

export const yearBudget = createSelector(
  [budget, year],
  (budget, year) => budget[year] || { income: {}, expenses: {}, irregular: {} }
);
