import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { addLocaleData, IntlProvider } from 'react-intl';
import pl from 'react-intl/locale-data/pl';

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './stores/rootReducer';
import rootSaga from './stores/rootSaga';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

addLocaleData([...pl]);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

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
};

const composeApp = (AppComponent, store, messages) => (
  <IntlProvider key="pl" locale="pl" messages={messages}>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </IntlProvider>
);

render(composeApp(App, store, messages), root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(composeApp(NextApp, store, messages), root);
  });
  module.hot.accept('./stores/rootReducer', () => {
    const nextReducer = require('./stores/rootReducer').default;

    store.replaceReducer(nextReducer);
  });
  // TODO: Add HMR for locales (when loaded from external file)
}

registerServiceWorker();
