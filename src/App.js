import React  from 'react';
import PropTypes from 'prop-types';
import { NOT_FOUND } from 'redux-first-router';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import BudgetLayout from './layouts/budget/BudgetLayout';
import ExpensesLayout from './layouts/expenses/ExpensesLayout';

import Landing from './views/landing/Landing';
import { Login } from './views/login';
import { NotFound } from './views/errors';
import { Accounts, IrregularBudget, MonthBudget, YearBudget } from './views/budget';
import { Expenses } from './views/expenses';

const mapStateToProps = (state) => ({
  page: state.location.type,
});

const pages = {
  HOME: () => <Landing />,
  [NOT_FOUND]: () => <NotFound />,
  LOGIN: () => <Login />,
  BUDGET: () => (
    <BudgetLayout>
      <MonthBudget />
    </BudgetLayout>
  ),
  BUDGET_SUMMARY: () => (
    <BudgetLayout>
      <YearBudget />
    </BudgetLayout>
  ),
  BUDGET_IRREGULAR: () => (
    <BudgetLayout>
      <IrregularBudget />
    </BudgetLayout>
  ),
  BUDGET_ACCOUNTS: () => (
    <BudgetLayout>
      <Accounts />
    </BudgetLayout>
  ),
  EXPENSES: () => (
    <ExpensesLayout>
      <Expenses />
    </ExpensesLayout>
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
