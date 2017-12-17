import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import pl from 'react-intl/locale-data/pl';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './stores';

import 'semantic-ui-css/semantic.min.css';

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
  'add-category-button.save': 'Dodaj',
  'add-category-button.cancel': 'Anuluj',
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
  module.hot.accept('./stores/index', () => {
    store.replaceReducer(require('./stores/index').rootReducer);
  });
  // TODO: Add HMR for locales (when loaded from external file)
}

registerServiceWorker();
