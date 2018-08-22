export const SET_BUDGET_ACCESS = 'BudgetAccessForm.SET_BUDGET_ACCESS';
export const SAVE_ACCESS = 'BudgetAccessForm.SAVE_ACCESS';
export const ADD_ERROR = 'BudgetAccessForm.ADD_ERROR';
export const ADD_FORM_ERROR = 'BudgetAccessForm.ADD_FORM_ERROR';

export const setBudgetAccess = (budgetAccess) => ({
  type: SET_BUDGET_ACCESS,
  payload: { budgetAccess },
});

export const saveBudgetAccess = (budgetAccess, recipient, name, password) => ({
  type: SAVE_ACCESS,
  payload: { budgetAccess, recipient, name, password },
});

export const addError = (error) => ({
  type: ADD_ERROR,
  error,
});

export const addFormError = (error) => ({
  type: ADD_FORM_ERROR,
  error,
});
