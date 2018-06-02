import * as Actions from './login.actions';

export const STATUS_NEW = 'new';
export const STATUS_CHECK_MAILBOX = 'check-mailbox';
export const STATUS_LOGGING_IN = 'logging-in';
export const STATUS_ENCRYPTION_PASSWORD = 'encryption-password';

const initialState = {
  status: STATUS_NEW,
  error: '',
  emailDomain: '',
};

export const LoginReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.MAGIC_MESSAGE_SENT:
      return { ...state, status: STATUS_CHECK_MAILBOX, emailDomain: action.payload.email.split('@')[1] };
    case Actions.SET_ENCRYPTION_PASSWORD:
      return { ...state, status: STATUS_ENCRYPTION_PASSWORD, error: action.error };
    case Actions.USER_LOGGED_IN:
      return { ...state, status: STATUS_LOGGING_IN };
    default:
      return state;
  }
};
