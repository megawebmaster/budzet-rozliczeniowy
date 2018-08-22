import * as Actions from './budget-access-form.actions';

const initialState = {
  access: undefined,
  errors: [],
  formErrors: [],
  loading: true,
  checking: false,
};

export const BudgetAccessReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.SET_BUDGET_ACCESS:
      return { ...state, access: action.payload.budgetAccess, loading: false };
    case Actions.SAVE_ACCESS:
      return { ...state, checking: true };
    case Actions.ADD_ERROR:
      return { ...state, errors: [...state.errors, action.error], checking: false };
    case Actions.ADD_FORM_ERROR:
      return { ...state, formErrors: [...state.formErrors, action.error], checking: false };
    default:
      return state;
  }
};
