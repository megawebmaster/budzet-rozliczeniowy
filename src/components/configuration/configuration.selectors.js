import { createSelector } from 'reselect';
import { budget } from '../location';

export const currencyType = (state) => state.configuration.currency.type;
export const currencyLabel = (state) => state.configuration.currency.sign;
export const maximumFractionDigits = (state) => state.configuration.currency.maximumFractionDigits;
export const minimumFractionDigits = (state) => state.configuration.currency.minimumFractionDigits;
export const availableYears = (state) => state.configuration.years;
export const availableBudgets = (state) => state.configuration.budgets;

export const currentBudget = createSelector(
  [availableBudgets, budget],
  (budgets, budgetSlug) => {
    const items = budgets.filter(budget => budget.slug === budgetSlug);
    if (items.length === 0) {
      return;
    }
    return items[0];
  }
);

export const savingCurrentBudget = createSelector(
  [currentBudget],
  (budget) => budget ? budget.saving : false,
);

export const currentBudgetError = createSelector(
  [currentBudget],
  (budget) => budget ? budget.error : '',
);
