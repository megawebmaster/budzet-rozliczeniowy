import { combineReducers } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import { routesMap } from './routes';

import { ConfigurationReducer } from './components/configuration';
import { CategoriesReducer } from './components/categories';
import { BudgetReducer } from './components/budget';
import { IrregularBudgetReducer } from './components/irregular-budget';
import { ExpensesReducer } from './components/expenses';
import { LoginReducer } from './components/login';
import { PasswordRequirementReducer } from './components/password-requirement';

const history = createHistory();
const { reducer: locationReducer, middleware: locationMiddleware, enhancer } = connectRoutes(history, routesMap);

export { locationMiddleware, enhancer };
export const appReducer = combineReducers({
  location: locationReducer,
  categories: CategoriesReducer,
  budget: BudgetReducer,
  irregular_budget: IrregularBudgetReducer,
  expenses: ExpensesReducer,
  configuration: ConfigurationReducer,
  login: LoginReducer,
  passwordRequirement: PasswordRequirementReducer,
});
