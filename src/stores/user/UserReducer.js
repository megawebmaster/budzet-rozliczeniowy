import * as UserAction from './UserAction';

const initialState = {
  loggedIn: false,
  name: {
    title: '',
    first: '',
    last: '',
  },
  email: '',
  dob: '',
  phone: '',
  id: {
    name: '',
    value: '',
  },
  picture: {
    large: '',
    medium: '',
    thumbnail: '',
  },
};

const loadUser = (state, action) => ({
  ...state,
  ...action.payload,
  loggedIn: true,
});

export default (state = initialState, action) => {
  switch(action.type){
    case UserAction.LOAD_USER_SUCCESS:
      return loadUser(state, action);
    default:
      return state;
  }
};
