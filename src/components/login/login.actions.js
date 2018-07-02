export const USER_LOGIN = 'LoginView.USER_LOGIN';
export const LOGIN_ERROR = 'LoginView.LOGIN_ERROR';
export const USER_LOGGED_IN = 'LoginView.USER_LOGGED_IN';
export const SET_ENCRYPTION_PASSWORD = 'LoginView.SET_ENCRYPTION_PASSWORD';
export const MAGIC_MESSAGE_SENT = 'LoginView.MAGIC_MESSAGE_SENT';

export const userLogIn = () => ({
  type: USER_LOGIN
});

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN
});

export const setEncryptionPassword = () => ({
  type: SET_ENCRYPTION_PASSWORD,
  error: '',
});

export const magicMessageSent = (email) => ({
  type: MAGIC_MESSAGE_SENT,
  payload: { email }
});

export const addLoginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});
