import React  from 'react';
import PropTypes from 'prop-types';
import { NOT_FOUND } from 'redux-first-router';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import BudgetLayout from './layouts/budget/BudgetLayout';
import SpendingLayout from './layouts/spending/SpendingLayout';

import Landing from './views/landing/Landing';
import { Login } from './views/login';
import { NotFound } from './views/errors';
import { Accounts, IrregularBudget, MonthBudget, YearBudget } from './views/budget';
import { Spending } from './views/spending';

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
  SPENDING: () => (
    <SpendingLayout>
      <Spending />
    </SpendingLayout>
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
