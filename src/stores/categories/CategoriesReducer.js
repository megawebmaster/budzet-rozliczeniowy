import * as Actions from './CategoriesAction';

const initialState = {
  income: [],
  expenses: [],
};

export default (state = initialState, action) => {
  let idx, expenses;

  switch(action.type){
    case Actions.ADD_INCOME_CATEGORY:
      return { ...state, income: [...state.income, { id: Date.now(), name: action.payload.name }]};
    case Actions.ADD_EXPENSES_CATEGORY:
      return { ...state, expenses: [...state.expenses, { id: Date.now(), name: action.payload.name, children: [] }]};
    case Actions.ADD_EXPENSES_SUBCATEGORY:
      idx = state.expenses.findIndex(item => item.id === action.payload.categoryId);
      expenses = state.expenses.slice();
      expenses.splice(idx, 1, { ...expenses[idx], children: [...expenses[idx].children, { id: Date.now(), name: action.payload.name }] });
      return { ...state, expenses};
    default:
      return state;
  }
};
