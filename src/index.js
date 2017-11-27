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
  'spending-grid.headers.category': 'Kategoria',
  'spending-grid.headers.price': 'Cena',
  'spending-grid.headers.day': 'Dzień',
  'spending-grid.headers.description': 'Opis',
  'spending-row.category': 'Wybierz kategorię',
  'spending-row.price': 'Cena',
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
