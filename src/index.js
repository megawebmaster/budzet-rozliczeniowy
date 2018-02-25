import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { addLocaleData, IntlProvider } from 'react-intl';
import pl from 'react-intl/locale-data/pl';

import { appReducer, enhancer, locationMiddleware } from './App.reducer';
import { appEpic } from './App.epic';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

const epicMiddleware = createEpicMiddleware(appEpic);
const initialState = {};
const store = createStore(
  appReducer,
  initialState,
  composeWithDevTools(enhancer, applyMiddleware(locationMiddleware, epicMiddleware))
);

addLocaleData([...pl]);

const root = document.getElementById('root');
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
  'header.menu.budget': 'Budżet',
  'header.menu.expenses': 'Rozliczenie',
  'header.year': 'Rok: {value}',
  'header.logout': 'Wyloguj się',
  'expenses-grid.headers.category': 'Kategoria',
  'expenses-grid.headers.price': 'Cena',
  'expenses-grid.headers.day': 'Dzień',
  'expenses-grid.headers.description': 'Opis',
  'expenses-row.category': 'Wybierz kategorię',
  'expenses-row.price': 'Cena',
  'budget.income': 'Przychody',
  'budget.expenses': 'Wydatki',
  'budget.table.add-category': 'Dodaj kategorię',
  'budget.table.add-subcategory': 'Dodaj podkategorię',
  'budget.table.header-planned': 'Planowane ({value})',
  'budget.table.header-real': 'Rzeczywiste ({value})',
  'budget.summary.label': 'Podsumowanie',
  'budget.summary.planned': 'Planowane: {value}',
  'budget.summary.real': 'Rzeczywiste: {value}',
  'budget.summary.to-use': 'Pozostało do dyspozycji',
  'budget.summary.left-planned': '{value}',
  'budget.summary.left-real': '{value}',
  'add-button.save': 'Dodaj',
  'add-button.cancel': 'Anuluj',
  'validation.day': 'Nieprawidłowy dzień: {value}',
  'validation.price.invalid': 'Nieprawidłowa wartość lub formuła',
  'views.expenses.title': 'Rozliczenie - {month} {year}',
  'views.expenses.header': 'Rozliczenie: {month} {year}',
  'views.month-budget.title': 'Budżet - {month} {year}',
  'views.month-budget.header': 'Miesiąc budżetowy: {month} {year}',
};

const composeApp = (AppComponent, store, messages) => (
  <IntlProvider key="pl" locale="pl" messages={messages}>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </IntlProvider>
);

ReactDOM.render(composeApp(App, store, messages), root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(composeApp(NextApp, store, messages), root);
  });
  module.hot.accept('./App.reducer', () => {
    store.replaceReducer(require('./App.reducer').appReducer);
  });
  module.hot.accept('./App.epic', () => {
    epicMiddleware.replaceEpic(require('./App.epic').appEpic);
  });
  // TODO: Add HMR for locales (when loaded from external file)
}

registerServiceWorker();
