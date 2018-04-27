export const BUDGETS_UPDATED = 'ConfigurationAction.BUDGETS_UPDATED';
export const YEARS_UPDATED = 'ConfigurationAction.YEARS_UPDATED';

export const updateBudgets = (budgets) => ({
  type: BUDGETS_UPDATED,
  payload: { budgets }
});

export const updateYears = (years) => ({
  type: YEARS_UPDATED,
  payload: { years }
});
