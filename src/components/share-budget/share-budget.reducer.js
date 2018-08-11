import * as Actions from './share-budget.actions';

const initialState = {
  error: '',
  members: undefined,
  saving: false,
};

export const ShareBudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.UPDATE_MEMBERS:
      return { ...state, members: action.payload.members, error: '', saving: false };
    case Actions.SHARE_BUDGET:
      return { ...state, saving: true };
    case Actions.SHARE_BUDGET_SUCCESS:
      return { ...state, members: [...state.members, action.payload.member], error: '', saving: false };
    case Actions.SHARE_BUDGET_FAIL:
      return { ...state, error: action.error, saving: false };
    case Actions.REMOVE_BUDGET_MEMBER:
      return { ...state, members: state.members.filter(member => member !== action.payload.member) };
    case Actions.REMOVE_BUDGET_MEMBER_FAIL:
      return { ...state, members: [...state.members, action.payload.member], error: action.error };
    default:
      return state;
  }
};
