import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { addLocaleData, IntlProvider } from 'react-intl';
import pl from 'react-intl/locale-data/pl';
import Header from './components/header/Header';
import { Login } from './views/login';
import { NotFound } from './views/errors';
import BudgetLayout from './layouts/budget/BudgetLayout';
import { Accounts, IrregularBudget, MonthBudget, YearBudget } from './views/budget';

addLocaleData([...pl]);

const messages = {
  'month.1': 'Styczeń',
  'month.2': 'Luty',
  'month.3': 'Marzec',
  'month.4': 'Kwiecień',
  'month.5': 'Maj',
  'month.6': 'Czerwiec',
  'month.7': 'Lipiec',
  'month.8': 'Sierpień',
  'month.9': 'Wrzesień',
  'month.10': 'Październik',
  'month.11': 'Listopad',
  'month.12': 'Grudzień',
};

export default ({store}) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const baseBudgetUrl = (year) => `/${year}/budget/${year === currentYear.toString() ? currentMonth : 'summary'}`;

  return (
    <IntlProvider key="pl" locale="pl" messages={messages}>
      <Provider store={store}>
        <BrowserRouter>
          <Container fluid>
            <Switch>
              <Route path="/:year" render={({ match: {params}}) => (
                <Switch>
                  <Route path="/:year/budget">
                    <BudgetLayout year={params.year}>
                      <Switch>
                        <Route path="/:year/budget/accounts" component={Accounts} />
                        <Route path="/:year/budget/irregular" component={IrregularBudget} />
                        <Route path="/:year/budget/summary" component={YearBudget} />
                        <Route path="/:year/budget/:month" component={MonthBudget} />
                        <Redirect from="/:year/budget" to={baseBudgetUrl(params.year)} />
                      </Switch>
                    </BudgetLayout>
                  </Route>
                  <Route path="/:year/spendings">
                    <div>
                      <Header year={params.year} />
                      <p>Spendings</p>
                    </div>
                  </Route>
                  <Redirect from="/:year" to={`/${params.year}/budget`} />
                </Switch>
              )} />
              <Route path="/login" component={Login} />
              <Redirect from="/" to={`/${currentYear}/budget/${currentMonth}`} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );
};
