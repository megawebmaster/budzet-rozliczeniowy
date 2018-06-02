export const USER_LOGGED_IN = 'LoginView.USER_LOGGED_IN';
export const SET_ENCRYPTION_PASSWORD = 'LoginView.SET_ENCRYPTION_PASSWORD';
export const MAGIC_MESSAGE_SENT = 'LoginView.MAGIC_MESSAGE_SENT';

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN
});

export const setEncryptionPassword = () => ({
  type: SET_ENCRYPTION_PASSWORD,
  error: '',
});

export const setEncryptionPasswordError = (error) => ({
  type: SET_ENCRYPTION_PASSWORD,
  error
});

export const magicMessageSent = (email) => ({
  type: MAGIC_MESSAGE_SENT,
  payload: { email }
});
