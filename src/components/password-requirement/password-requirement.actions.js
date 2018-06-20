export const REQUIRE_PASSWORD = 'PasswordRequirement.REQUIRE_PASSWORD';
export const REQUIRE_PASSWORD_ERROR = 'PasswordRequirement.REQUIRE_PASSWORD_ERROR';
export const CONTINUE_ACTIONS = 'PasswordRequirement.CONTINUE_ACTIONS';
export const CLEAR_ACTIONS = 'PasswordRequirement.CLEAR_ACTIONS';

export const requirePassword = (action) => ({
  type: REQUIRE_PASSWORD,
  payload: { action },
});

export const requirePasswordError = (error) => ({
  type: REQUIRE_PASSWORD_ERROR,
  error
});

export const continueActions = () => ({
  type: CONTINUE_ACTIONS
});

export const clearActions = () => ({
  type: CLEAR_ACTIONS
});
