import * as Actions from './BudgetAction';

const initialState = {};

export default (state = initialState, action) => {
  let value;
  const baseValue = { real: 0, savingReal: false, planned: 0, savingPlanned: false };
  switch(action.type){
    case Actions.UPDATE_PLANNED:
      try {
        value = parseFloat(action.payload.value);
      } catch(e) {
        value = 0;
      }

      return { ...state, [action.payload.year]: {
          ...state[action.payload.year],
          income: {
            ...state[action.payload.year].income,
            [action.payload.month]: {
              ...state[action.payload.year].income[action.payload.month],
              [action.payload.categoryId]: {
                ...(state[action.payload.year].income[action.payload.month][action.payload.categoryId] || { ...baseValue }),
                planned: value,
                savingPlanned: true,
              },
            },
          },
        },
      };
    case Actions.UPDATE_REAL:
      // TODO: Extract generation logic ;)
      try {
        value = parseFloat(action.payload.value);
      } catch(e) {
        value = 0;
      }

      return { ...state, [action.payload.year]: {
          ...state[action.payload.year],
          income: {
            ...state[action.payload.year].income,
            [action.payload.month]: {
              ...state[action.payload.year].income[action.payload.month],
              [action.payload.categoryId]: {
                ...(state[action.payload.year].income[action.payload.month][action.payload.categoryId] || { ...baseValue }),
                real: value,
                savingReal: true,
              },
            },
          },
        },
      };
    default:
      return state;
  }
};
