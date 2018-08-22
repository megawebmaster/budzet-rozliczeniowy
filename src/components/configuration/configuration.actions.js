export const BUDGETS_UPDATED = 'ConfigurationAction.BUDGETS_UPDATED';
export const ADD_BUDGET = 'ConfigurationAction.ADD_BUDGET';
export const YEARS_UPDATED = 'ConfigurationAction.YEARS_UPDATED';
export const RENAME_BUDGET = 'ConfigurationAction.RENAME_BUDGET';
export const RENAME_BUDGET_SUCCESS = 'ConfigurationAction.RENAME_BUDGET_SUCCESS';
export const RENAME_BUDGET_FAIL = 'ConfigurationAction.RENAME_BUDGET_FAIL';

export const updateBudgets = (budgets) => ({
  type: BUDGETS_UPDATED,
  payload: { budgets }
});

export const addBudget = (budget) => ({
  type: ADD_BUDGET,
  payload: { budget }
});

export const updateYears = (years) => ({
  type: YEARS_UPDATED,
  payload: { years }
});

export const renameBudget = (budget, name) => ({
  type: RENAME_BUDGET,
  payload: { budget, name },
});
