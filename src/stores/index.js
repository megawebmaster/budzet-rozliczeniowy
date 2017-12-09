import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';

import rootSaga from './rootSaga';
import routesMap from './../routes';

import user from './user/UserReducer';
import spending from './spending/SpendingReducer';

const history = createHistory();
const { reducer: locationReducer, middleware: locationMiddleware, enhancer } = connectRoutes(history, routesMap);

const rootReducer = combineReducers({
  location: locationReducer,
  form: formReducer,
  user,
  spending,
});

const sagaMiddleware = createSagaMiddleware();
const initialState = {
  spending: {
    categories: [
      {text: 'Jedzenie - Dom', value: 1},
      {text: 'Jedzenie - Praca', value: 2},
      {text: 'Jedzenie - Miasto', value: 3},
      {text: 'Słodycze', value: 4},
      {text: 'Mieszkanie', value: 5},
    ],
    rows: {
      9: [
        { id: 1, category: 5, price: 121.43, day: 7, description: 'Płatność za mieszkanie' },
      ],
      10: [
        { id: 2, category: 4, price: 7.00, day: 3, description: 'Na poprawę humoru' },
      ],
      11: [
        { id: 1, category: 1, price: 10.00, day: 1, description: '' },
        { id: 2, category: 4, price: 5.00, day: 3, description: 'Drobnostki' },
      ]
    }
  }
};
export default createStore(
  rootReducer,
  initialState,
  compose(enhancer, applyMiddleware(locationMiddleware, sagaMiddleware))
);
export { rootReducer };
sagaMiddleware.run(rootSaga);
