import React  from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import BudgetLayout from './layouts/budget/BudgetLayout';
import SpendingLayout from './layouts/spending/SpendingLayout';

import Landing from './views/landing/Landing';
import { Login } from './views/login';
import { NotFound } from './views/errors';
import { Accounts, IrregularBudget, MonthBudget, YearBudget } from './views/budget';

const mapStateToProps = (state) => ({
  userLoggedIn: state.user.loggedIn,
});

export const App = ({ userLoggedIn }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const baseBudgetUrl = (year) => `/${year}/budget/${year === currentYear ? currentMonth : 'summary'}`;
  const baseSpendingUrl = (year) => `/${year}/spending/${year === currentYear ? currentMonth : 1}`;

  return (
    <BrowserRouter>
      <Container fluid>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/:year" render={({ match: {params}}) => {
            const year = parseInt(params.year, 10);
            return (
              <Switch>
                <Route path="/:year/budget">
                  <BudgetLayout year={year}>
                    <Switch>
                      <Route path="/:year/budget/accounts" component={Accounts} />
                      <Route path="/:year/budget/irregular" component={IrregularBudget} />
                      <Route path="/:year/budget/summary" component={YearBudget} />
                      <Route path="/:year/budget/:month" component={MonthBudget} />
                      <Redirect from="/:year/budget" to={baseBudgetUrl(year)} />
                    </Switch>
                  </BudgetLayout>
                </Route>
                <Route path="/:year/spending">
                  <SpendingLayout year={year}>
                    <Switch>
                      <Route path="/:year/spending/:month" render={() => <p>Rozliczenie</p>} />
                      <Redirect from="/:year/spending" to={baseSpendingUrl(year)} />
                    </Switch>
                  </SpendingLayout>
                </Route>
              </Switch>
            );
          }} />
          { userLoggedIn ?
            <Redirect from="/" to={`/${currentYear}/budget/${currentMonth}`} /> :
            <Route path="/" component={Landing} />
          }
          <Route component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

App.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
