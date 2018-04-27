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

export const ConfigurationReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.YEARS_UPDATED:
      return { ...state, years: action.payload.years };
    case Actions.BUDGETS_UPDATED:
      return { ...state, budgets: action.payload.budgets };
    default:
      return state;
  }
};
