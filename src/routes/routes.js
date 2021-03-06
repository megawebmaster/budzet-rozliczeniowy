import { redirect } from 'redux-first-router';
import {
  ROUTE_ACCESS_BUDGET,
  ROUTE_BUDGET,
  ROUTE_BUDGET_IRREGULAR,
  ROUTE_BUDGET_MONTH,
  ROUTE_EXPENSES_MONTH,
  ROUTE_HOME,
  ROUTE_LOGIN
} from './routes.actions';
import { Authenticator } from '../App.auth';
import { userLogIn } from '../components/login';

const loginUnauthenticated = (dispatch) => {
  if (!Authenticator.isLoggedIn()) {
    Authenticator.storeCurrentPath();
    dispatch(userLogIn());
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
  [ROUTE_ACCESS_BUDGET]: {
    path: '/budget/shared/:budgetAccessId',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET]: {
    path: '/:budget/:year/budget',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_IRREGULAR]: {
    path: '/:budget/:year/budget/irregular',
    thunk: loginUnauthenticated
  },
  [ROUTE_BUDGET_MONTH]: {
    path: '/:budget/:year/budget/:month',
    thunk: loginUnauthenticated
  },
  [ROUTE_EXPENSES_MONTH]: {
    path: '/:budget/:year/expenses/:month',
    thunk: loginUnauthenticated
  }
};
