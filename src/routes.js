import { redirect } from 'redux-first-router';


const loginUnauthenticated = (dispatch, getState) => {
  const { user: { isLoggedIn } } = getState();

  if (!isLoggedIn) {
    // dispatch(redirect({ type: 'LOGIN' }));
  }
};

const redirectAuthenticated = (dispatch, getState) => {
  const { user: { isLoggedIn } } = getState();

  if (isLoggedIn) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    dispatch(redirect({ type: 'BUDGET', params: { year, month } }));
  }
};

export default {
  HOME: {
    path: '/',
    thunk: redirectAuthenticated
  },
  LOGIN: {
    path: '/login',
    thunk: redirectAuthenticated
  },
  BUDGET_SUMMARY: {
    path: '/:year/budget/summary',
    thunk: loginUnauthenticated
  },
  BUDGET_IRREGULAR: {
    path: '/:year/budget/irregular',
    thunk: loginUnauthenticated
  },
  BUDGET_ACCOUNTS: {
    path: '/:year/budget/accounts',
    thunk: loginUnauthenticated
  },
  BUDGET: {
    path: '/:year/budget/:month',
    thunk: loginUnauthenticated
  },
  SPENDING: {
    path: '/:year/spending/:month',
    thunk: loginUnauthenticated
  },
};
