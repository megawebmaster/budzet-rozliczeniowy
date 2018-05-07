import { redirect } from 'redux-first-router';
import {
  ROUTE_BUDGET,
  ROUTE_BUDGET_ACCOUNTS,
  ROUTE_BUDGET_IRREGULAR,
  ROUTE_BUDGET_MONTH,
  ROUTE_BUDGET_SUMMARY,
  ROUTE_EXPENSES_MONTH,
  ROUTE_HOME,
  ROUTE_LOGIN
} from './routes.actions';
import { Authenticator } from '../App.auth';

const loginUnauthenticated = (dispatch) => {
  if (!Authenticator.isLoggedIn()) {
    dispatch(redirect({ type: ROUTE_LOGIN }));
  }
};

// TODO: This needs to be visible on the page we are...
const redirectAuthenticated = (dispatch) => {
  if (Authenticator.isLoggedIn()) {
    dispatch(redirect({ type: ROUTE_LOGIN }));
  }
};

export default {
  [ROUTE_HOME]: {
    path: '/',
    thunk: redirectAuthenticated
  },
  [ROUTE_LOGIN]: {
    path: '/login'
  },
  [ROUTE_BUDGET]: {
    path: '/:budget/:year/budget',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_SUMMARY]: {
    path: '/:budget/:year/budget/summary',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_IRREGULAR]: {
    path: '/:budget/:year/budget/irregular',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_ACCOUNTS]: {
    path: '/:budget/:year/budget/accounts',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_MONTH]: {
    path: '/:budget/:year/budget/:month',
    thunk: loginUnauthenticated
  },
  [ROUTE_EXPENSES_MONTH]: {
    path: '/:budget/:year/expenses/:month',
    thunk: loginUnauthenticated
  },
};
