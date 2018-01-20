export const SAVE_INCOME_PLANNED = 'BudgetAction.SAVE_INCOME_PLANNED';
export const UPDATE_INCOME_PLANNED = 'BudgetAction.UPDATE_INCOME_PLANNED';
export const INCOME_PLANNED_SAVE_SUCCESS = 'BudgetAction.INCOME_PLANNED_SAVE_SUCCESS';
export const INCOME_PLANNED_SAVE_FAIL = 'BudgetAction.INCOME_PLANNED_SAVE_FAIL';

export const SAVE_INCOME_REAL = 'BudgetAction.SAVE_INCOME_REAL';
export const UPDATE_INCOME_REAL = 'BudgetAction.UPDATE_INCOME_REAL';
export const INCOME_REAL_SAVE_SUCCESS = 'BudgetAction.INCOME_REAL_SAVE_SUCCESS';
export const INCOME_REAL_SAVE_FAIL = 'BudgetAction.INCOME_REAL_SAVE_FAIL';

export const SAVE_EXPENSE_PLANNED = 'BudgetAction.SAVE_EXPENSE_PLANNED';
export const UPDATE_EXPENSE_PLANNED = 'BudgetAction.UPDATE_EXPENSE_PLANNED';
export const EXPENSE_PLANNED_SAVE_SUCCESS = 'BudgetAction.EXPENSE_PLANNED_SAVE_SUCCESS';
export const EXPENSE_PLANNED_SAVE_FAIL = 'BudgetAction.EXPENSE_PLANNED_SAVE_FAIL';

export const SAVE_EXPENSE_REAL = 'BudgetAction.SAVE_EXPENSE_REAL';
export const UPDATE_EXPENSE_REAL = 'BudgetAction.UPDATE_EXPENSE_REAL';
export const EXPENSE_REAL_SAVE_SUCCESS = 'BudgetAction.EXPENSE_REAL_SAVE_SUCCESS';
export const EXPENSE_REAL_SAVE_FAIL = 'BudgetAction.EXPENSE_REAL_SAVE_FAIL';

export const SAVE_IRREGULAR_PLANNED = 'BudgetAction.SAVE_IRREGULAR_PLANNED';
export const UPDATE_IRREGULAR_PLANNED = 'BudgetAction.UPDATE_IRREGULAR_PLANNED';
export const IRREGULAR_PLANNED_SAVE_SUCCESS = 'BudgetAction.IRREGULAR_PLANNED_SAVE_SUCCESS';
export const IRREGULAR_PLANNED_SAVE_FAIL = 'BudgetAction.IRREGULAR_PLANNED_SAVE_FAIL';

export const updatePlannedIncome = (year, month, categoryId, value) => ({
  type: SAVE_INCOME_PLANNED,
  payload: { year, month, categoryId, value }
});
export const updateRealIncome = (year, month, categoryId, value) => ({
  type: SAVE_INCOME_REAL,
  payload: { year, month, categoryId, value }
});
export const updatePlannedExpense = (year, month, categoryId, value) => ({
  type: SAVE_EXPENSE_PLANNED,
  payload: { year, month, categoryId, value }
});
export const updateRealExpense = (year, month, categoryId, value) => ({
  type: SAVE_EXPENSE_REAL,
  payload: { year, month, categoryId, value }
});
export const updatePlannedIrregular = (year, categoryId, value) => ({
  type: SAVE_IRREGULAR_PLANNED,
  payload: { year, categoryId, value }
});
