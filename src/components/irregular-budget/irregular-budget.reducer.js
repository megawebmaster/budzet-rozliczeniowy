import * as Actions from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';

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

const setValue = (state, year, categoryId, value) => {
  const selectedYear = state[year].slice() || [];
  let idx = selectedYear.findIndex(entry => entry.categoryId === categoryId);

  if (idx < 0) {
    idx = selectedYear.length;
    selectedYear.push({ ...baseValue, categoryId });
  }

  selectedYear.splice(idx, 1, {
    ...selectedYear[idx],
    ...value,
    plan: { ...selectedYear[idx].plan, ...(value.plan || {}) },
    real: { ...selectedYear[idx].real, ...(value.real || {}) },
  });

  return { ...state, [year]: selectedYear };
};

// TODO: Improve recalculating trees - update only required branches (reselect + immutable)
const loadIrregularBudget = (state, year, values) => {
  const yearValues = values.map(entry => ({
    ...baseValue,
    ...entry,
    plan: { ...baseValue.plan, ...entry.plan },
    real: { ...baseValue.real, ...entry.real },
  }));

  return {
    ...state,
    loading: false,
    [year]: yearValues,
  };
};

export const IrregularBudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_ENCRYPTED_IRREGULAR_BUDGET:
      return loadIrregularBudget(state, action.payload.year, action.payload.values);
    case Actions.UPDATE_IRREGULAR_BUDGET_ENTRY:
      return setValue(state, action.payload.year, action.payload.categoryId, action.payload.value);
    case Actions.SAVING_IRREGULAR_BUDGET:
      return setValue(state, action.payload.year, action.payload.categoryId, {
        plan: { value: action.payload.value, saving: true },
        type: 'irregular',
      });
    case Actions.SAVE_IRREGULAR_SUCCESS:
      return setValue(state, action.payload.year, action.payload.categoryId, {
        plan: { saving: false },
      });
    case Actions.SAVE_IRREGULAR_FAIL:
      return setValue(state, action.payload.year, action.payload.categoryId, {
        plan: { error: action.error, saving: false },
      });
    case Actions.ADD_IRREGULAR_BUDGET_ERROR:
      return { ...state, errors: [...state.errors, action.error], loading: false };
    case Actions.CLEAR_IRREGULAR_BUDGET_ERRORS:
      return { ...state, errors: [] };
    case ROUTE_BUDGET_IRREGULAR:
      return { ...state, loading: true };
    default:
      return state;
  }
};
