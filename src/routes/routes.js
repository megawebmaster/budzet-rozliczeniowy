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

const redirectAuthenticated = (dispatch) => {
  if (Authenticator.isLoggedIn()) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    dispatch(redirect({ type: ROUTE_BUDGET_MONTH, payload: { year, month } }));
  }
};

export default {
  [ROUTE_HOME]: {
    path: '/',
    thunk: redirectAuthenticated
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    thunk: redirectAuthenticated
  },
  [ROUTE_BUDGET]: {
    path: '/:year/budget',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_SUMMARY]: {
    path: '/:year/budget/summary',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_IRREGULAR]: {
    path: '/:year/budget/irregular',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_ACCOUNTS]: {
    path: '/:year/budget/accounts',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_MONTH]: {
    path: '/:year/budget/:month',
    thunk: loginUnauthenticated
  },
  [ROUTE_EXPENSES_MONTH]: {
    path: '/:year/expenses/:month',
    thunk: loginUnauthenticated
  },
};
