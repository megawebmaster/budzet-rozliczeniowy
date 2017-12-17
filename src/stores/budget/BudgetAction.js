export const UPDATE_PLANNED = 'BudgetAction.UPDATE_PLANNED';
export const UPDATE_REAL = 'BudgetAction.UPDATE_REAL';

export const updatePlanned = (year, month, categoryId, value) => ({
  type: UPDATE_PLANNED,
  payload: { year, month, categoryId, value }
});
export const updateReal = (year, month, categoryId, value) => ({
  type: UPDATE_REAL,
  payload: { year, month, categoryId, value }
});
