import { combineReducers } from 'redux';
import user from './user/UserReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  user,
});
