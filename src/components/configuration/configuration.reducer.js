import * as Actions from './configuration.actions';

const initialState = {
  locale: 'pl',
  currency: {
    type: 'PLN',
    sign: 'zł',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  years: [],
  budgets: [],
};

const updateBudget = (state, budgetId, values) => {
  const budgets = state.budgets.slice();
  const idx = budgets.findIndex(budget => budget.id === budgetId);

  if (idx > -1) {
    budgets.splice(idx, 1, { ...budgets[idx], ...values });
  }

  return budgets;
};

export const ConfigurationReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.YEARS_UPDATED:
      return { ...state, years: action.payload.years };
    case Actions.BUDGETS_UPDATED:
      return { ...state, budgets: action.payload.budgets };
    case Actions.ADD_BUDGET:
      return { ...state, budgets: [...state.budgets, action.payload.budget] };
    case Actions.RENAME_BUDGET:
      return {
        ...state,
        budgets: updateBudget(state, action.payload.budget.id, {
          error: '',
          name: action.payload.name,
          saving: true,
        }),
      };
    case Actions.RENAME_BUDGET_SUCCESS:
      return {
        ...state,
        budgets: updateBudget(state, action.payload.budget.id, {
          ...action.payload.budget,
          saving: false,
        }),
      };
    case Actions.RENAME_BUDGET_FAIL:
      return {
        ...state,
        budgets: updateBudget(state, action.payload.budget.id, {
          error: action.error,
        }),
      };
    default:
      return state;
  }
};
