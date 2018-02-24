import * as Actions from './configuration.actions';

const initialState = {
  locale: 'pl',
  currency: {
    type: 'PLN',
    sign: 'zł',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  years: {
    loading: true,
    data: []
  },
};

export const ConfigurationReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.YEARS_UPDATED:
      return {
        ...state,
        years: { loading: false, data: action.payload.years },
      };
    default:
      return state;
  }
};
