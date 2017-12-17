import * as Actions from './BudgetAction';

const initialState = {};

export default (state = initialState, action) => {
  let value;
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
                ...(state[action.payload.year].income[action.payload.month][action.payload.categoryId] || { real: 0, planned: 0 }),
                planned: value,
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
                ...(state[action.payload.year].income[action.payload.month][action.payload.categoryId] || { real: 0, planned: 0 }),
                real: value,
              },
            },
          },
        },
      };
    default:
      return state;
  }
};
