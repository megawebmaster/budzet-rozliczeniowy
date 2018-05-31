import { combineEpics } from 'redux-observable';

import { routesEpic } from './routes';
import { budgetEpic } from './components/budget';
import { expensesEpic } from './components/expenses';
import { irregularBudgetEpic } from './components/irregular-budget';
import { categoriesEpic } from './components/categories';
import { loginEpic } from './components/login';

export const appEpic = combineEpics(
  routesEpic,
  budgetEpic,
  expensesEpic,
  irregularBudgetEpic,
  categoriesEpic,
  loginEpic
);
