import * as Actions from './budget.actions';
import { ROUTE_BUDGET_MONTH } from '../../routes';

const initialState = {
  loading: true,
  errors: [],
};

const baseValue = {
  plan: {
    value: 0,
    error: '',
    saving: false,
    encrypted: false,
  },
  real: {
    value: 0,
    error: '',
    saving: false,
    encrypted: false,
  },
  type: '',
  categoryId: '',
};

const setValue = (state, year, month, categoryId, value) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];
  let idx = selectedMonth.findIndex(entry => entry.categoryId === categoryId);

  if (idx < 0) {
    idx = selectedMonth.length;
    selectedMonth.push({ ...baseValue, categoryId });
  }

  selectedMonth.splice(idx, 1, {
    ...selectedMonth[idx],
    ...value,
    plan: { ...selectedMonth[idx].plan, ...(value.plan || {}) },
    real: { ...selectedMonth[idx].real, ...(value.real || {}) },
  });

  return { ...state, [year]: { ...selectedYear, [month]: selectedMonth } };
};

// TODO: Improve recalculating trees - update only required branches (reselect + immutable)
const loadMonth = (state, year, month, values) => {
  const selectedYear = state[year] || {};
  const monthValues = values.map(entry => ({
    ...baseValue,
    ...entry,
    plan: { ...baseValue.plan, ...entry.plan },
    real: { ...baseValue.real, ...entry.real },
  }));

  return {
    ...state,
    loading: false,
    [year]: {
      ...selectedYear,
      [month]: monthValues
    }
  };
};

export const BudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_ENCRYPTED_BUDGET:
      return loadMonth(state, action.payload.year, action.payload.month, action.payload.values);
    case Actions.UPDATE_BUDGET_ENTRY:
      return setValue(state, action.payload.year, action.payload.month, action.payload.categoryId, action.payload.value);
    case Actions.SAVING_BUDGET:
      return setValue(state, action.payload.year, action.payload.month, action.payload.categoryId, {
        [action.payload.valueType]: { value: action.payload.value, saving: true },
        type: action.payload.categoryType,
      });
    case Actions.SAVE_SUCCESS:
      return setValue(state, action.payload.year, action.payload.month, action.payload.categoryId, {
        [action.payload.valueType]: { saving: false }
      });
    case Actions.SAVE_FAIL:
      return setValue(state, action.payload.year, action.payload.month, action.payload.categoryId, {
        [action.payload.valueType]: { error: action.error, saving: false }
      });
    case Actions.ADD_BUDGET_ERROR:
      return { ...state, errors: [...state.errors, action.error], loading: false };
    case Actions.CLEAR_BUDGET_ERRORS:
      return { ...state, errors: [] };
    case ROUTE_BUDGET_MONTH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
