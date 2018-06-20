import * as Actions from './password-requirement.actions';

const initialState = {
  error: '',
  show: false,
  loading: false,
  actionsToFinish: [],
};

export const PasswordRequirementReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.REQUIRE_PASSWORD:
      return { ...state, show: true, actionsToFinish: [ ...state.actionsToFinish, action.payload.action ] };
    case Actions.REQUIRE_PASSWORD_ERROR:
      return { ...state, show: true, error: action.error };
    case Actions.CONTINUE_ACTIONS:
      return { ...state, loading: true, show: false, error: '' };
    case Actions.CLEAR_ACTIONS:
      return { ...state, loading: false, show: false, actionsToFinish: []};
    default:
      return state;
  }
};
