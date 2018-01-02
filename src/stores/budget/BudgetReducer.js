import * as Actions from './BudgetAction';

const initialState = {};

const baseValue = { real: 0, savingReal: false, planned: 0, savingPlanned: false };
const updateValue = (type, state, action, value) => {
  const { month, year, categoryId } = action.payload;

  return {
    ...state,
    [year]: {
      ...state[year],
      [type]: {
        ...state[year][type],
        [month]: {
          ...state[year][type][month],
          [categoryId]: {
            ...(state[year][type][month][categoryId] || { ...baseValue }),
            ...value,
          },
        },
      },
    },
  };
};

export default (state = initialState, action) => {
  switch(action.type){
    case Actions.UPDATE_INCOME_PLANNED:
      return updateValue('income', state, action, { planned: action.payload.value, savingPlanned: true});
    case Actions.INCOME_PLANNED_SAVE_SUCCESS:
      return updateValue('income', state, action, { savingPlanned: false });
    case Actions.INCOME_PLANNED_SAVE_FAIL:
      return updateValue('income', state, action, { savingPlanned: false, error: action.error });
    case Actions.UPDATE_INCOME_REAL:
      return updateValue('income', state, action, { real: action.payload.value, savingReal: true});
    case Actions.INCOME_REAL_SAVE_SUCCESS:
      return updateValue('income', state, action, { savingReal: false });
    case Actions.INCOME_REAL_SAVE_FAIL:
      return updateValue('income', state, action, { savingReal: false, error: action.error });
    case Actions.UPDATE_EXPENSE_PLANNED:
      return updateValue('expenses', state, action, { planned: action.payload.value, savingPlanned: true});
    case Actions.EXPENSE_PLANNED_SAVE_SUCCESS:
      return updateValue('expenses', state, action, { savingPlanned: false });
    case Actions.EXPENSE_PLANNED_SAVE_FAIL:
      return updateValue('expenses', state, action, { savingPlanned: false, error: action.error });
    case Actions.UPDATE_EXPENSE_REAL:
      return updateValue('expenses', state, action, { real: action.payload.value, savingReal: true});
    case Actions.EXPENSE_REAL_SAVE_SUCCESS:
      return updateValue('expenses', state, action, { savingReal: false });
    case Actions.EXPENSE_REAL_SAVE_FAIL:
      return updateValue('expenses', state, action, { savingReal: false, error: action.error });
    default:
      return state;
  }
};
