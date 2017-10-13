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

export default ({store}) => (
  <IntlProvider key="pl" locale="pl" messages={messages}>
    <Provider store={store}>
      <BrowserRouter>
        <Container fluid>
          <Switch>
            <Route path="/budget" component={Header} />
          </Switch>
          <Switch>
            <Route path="/budget">
              <BudgetLayout>
                <Route path="/budget/accounts" component={Accounts} />
                <Route path="/budget/irregular" component={IrregularBudget} />
                <Route path="/budget/year" component={YearBudget} />
                <Route path="/budget/month/:month" component={MonthBudget} />
              </BudgetLayout>
            </Route>
            <Route path="/login" component={Login} />
            <Redirect from="/" to={`/budget/month/${new Date().getMonth() + 1}`} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);
