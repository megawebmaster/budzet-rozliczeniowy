import React from 'react';
import PropTypes from 'prop-types';
import { NOT_FOUND } from 'redux-first-router';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import BudgetLayout from './layouts/budget/BudgetLayout';
import ExpensesLayout from './layouts/expenses/ExpensesLayout';

import { Landing } from './views/landing';
import { Login } from './views/login';
import { NotFound } from './views/errors';
import { MonthBudget } from './views/month-budget';
import { IrregularBudget } from './views/irregular-budget';
import { Expenses } from './views/expenses';
import { AccessBudget } from './views/access-budget';

import {
  ROUTE_ACCESS_BUDGET,
  ROUTE_BUDGET_IRREGULAR,
  ROUTE_BUDGET_MONTH,
  ROUTE_EXPENSES_MONTH,
  ROUTE_HOME,
  ROUTE_LOGIN
} from './routes';
import SimpleLayout from './layouts/simple/simple.layout';

const mapStateToProps = (state) => ({
  page: state.location.type,
});

const pages = {
  [ROUTE_HOME]: () => <Landing />,
  [NOT_FOUND]: () => <NotFound />,
  [ROUTE_LOGIN]: () => <Login />,
  [ROUTE_BUDGET_MONTH]: () => (
    <BudgetLayout>
      <MonthBudget />
    </BudgetLayout>
  ),
  [ROUTE_BUDGET_IRREGULAR]: () => (
    <BudgetLayout>
      <IrregularBudget />
    </BudgetLayout>
  ),
  [ROUTE_EXPENSES_MONTH]: () => (
    <ExpensesLayout>
      <Expenses />
    </ExpensesLayout>
  ),
  [ROUTE_ACCESS_BUDGET]: () => (
    <SimpleLayout>
      <AccessBudget />
    </SimpleLayout>
  ),
};

export const App = ({ page }) => (
  <Container fluid>
    {pages[page]()}
  </Container>
);

App.propTypes = {
  page: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
