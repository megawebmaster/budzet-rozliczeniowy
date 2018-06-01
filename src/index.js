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
import { initEncryption } from './App.encryption';

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
  'error-title': 'Coś poszło nie tak…',
  'errors.invalid-encryption-password': 'Nieprawidłowe hasło szyfrujące',
  'errors.expense.category.required': 'Kategoria wydatku jest wymagana',
  'errors.expense.price.required': 'Koszt jest wymagany',
  'errors.expense.day.required': 'Dzień zakupu jest wymagany',
  'header.budget': 'Budżet {value}',
  'header.menu.budget': 'Budżet',
  'header.menu.expenses': 'Wydatki',
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
  'budget.irregular': 'Nieregularne wydatki',
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
  'validation.required': 'Wymagany',
  'validation.day': 'Nieprawidłowy dzień: {value}',
  'validation.price.invalid': 'Nieprawidłowa wartość lub formuła',
  'price-input.average-help': 'Średnio: {value} {currency}',
  'views.expenses.title': 'Rozliczenie - {month} {year}',
  'views.expenses.header': 'Rozliczenie: {month} {year}',
  'views.month-budget.title': 'Budżet - {month} {year}',
  'views.month-budget.header': 'Miesiąc budżetowy: {month} {year}',
  'views.irregular-budget.title': 'Budżet - wydatki nieregularne {year}',
  'views.irregular-budget.header': 'Wydatki nieregularne: {year} rok',
  'views.irregular-budget.table-label': 'Roczne wydatki nieregularne',
  'views.login.title': 'Zaloguj się do swojego konta',
  'views.login.form-email': 'Adres e-mail',
  'views.login.form-button': 'Wyślij mi magiczny link',
  'views.login.new-message': 'Nie masz jeszcze konta? Po prostu zaloguj się, a my utworzymy je dla Ciebie!',
  'views.login.check-mailbox-title': 'Magiczny link wysłany',
  'views.login.check-mailbox': 'Sprawdź swoją skrzynkę e-mail i kliknij na link w wiadomości od nas, żeby się zalogować',
  'views.login.logging-in': 'Logowanie w toku…',
  'views.login.encryption-password': 'Podaj hasło szyfrujące',
  'views.login.encryption-button': 'Odszyfruj dane',
  'views.landing.login': 'Zaloguj się',
};

const composeApp = (AppComponent, store, messages) => (
  <IntlProvider key="pl" locale="pl" messages={messages}>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </IntlProvider>
);

ReactDOM.render(composeApp(App, store, messages), root);
initEncryption();

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
