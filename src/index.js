import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './stores/rootReducer';
import rootSaga from './stores/rootSaga';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const root = document.getElementById('root');

render(<App store={store} />, root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp store={store} />, root);
  });
  module.hot.accept('./stores/rootReducer', () => {
    const nextReducer = require('./stores/rootReducer').default;

    store.replaceReducer(nextReducer);
  });
}

registerServiceWorker();
