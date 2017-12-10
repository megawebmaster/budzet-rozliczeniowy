import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './rootSaga';
import routesMap from './../routes';

import user from './user/UserReducer';
import categories from './categories/CategoriesReducer';
import budget from './budget/BudgetReducer';
import spending from './spending/SpendingReducer';

const history = createHistory();
const { reducer: locationReducer, middleware: locationMiddleware, enhancer } = connectRoutes(history, routesMap);

const rootReducer = combineReducers({
  location: locationReducer,
  user,
  categories,
  budget,
  spending,
});

const sagaMiddleware = createSagaMiddleware();
const initialState = {
  categories: {
    income: [
      {text: 'Wynagrodzenie', value: 6},
      {text: 'Premie', value: 7},
      {text: 'Odsetki bankowe', value: 8},
    ],
    expenses: [
      {
        text: 'Jedzenie', children: [
          {text: 'Dom', value: 1},
          {text: 'Praca', value: 2},
          {text: 'Miasto', value: 3},
          {text: 'Słodycze', value: 4},
        ],
      },
      {
        text: 'Mieszkanie', children: [
          {text: 'Czynsz', value: 5},
        ],
      },
    ]
  },
  budget: {
    2017: {
      income: {
        10: {
          6: {
            planned: 1000.00,
            real: 1200.00,
          },
        },
        11: {
          6: {
            planned: 1200.00,
            real: 1200.00,
          },
        },
        12: {
          6: {
            planned: 1200.00,
            real: 1300.00,
          },
        },
      },
      expenses: {
        10: {
          1: {
            planned: 100.00,
            real: 80.00,
          },
          2: {
            planned: 10.00,
            real: 8.00,
          },
          3: {
            planned: 0.00,
            real: 7.50,
          },
          4: {
            planned: 5.00,
            real: 3.00,
          },
          5: {
            planned: 250.00,
            real: 248.97,
          },
        },
        11: {
          1: {
            planned: 80.00,
            real: 100.00,
          },
          2: {
            planned: 50.00,
            real: 45.00,
          },
          3: {
            planned: 100.00,
            real: 77.53,
          },
          4: {
            planned: 5.00,
            real: 4.20,
          },
          5: {
            planned: 250.00,
            real: 248.97,
          },
        },
        12: {
          1: {
            planned: 100.00,
            real: 100.00,
          },
          2: {
            planned: 10.00,
            real: 8.00,
          },
          3: {
            planned: 5.00,
            real: 7.00,
          },
          4: {
            planned: 5.00,
            real: 0.00,
          },
          5: {
            planned: 250.00,
            real: 248.97,
          },
        },
      },
    },
  },
  spending: {
    2017: {
      10: [
        { id: 2, category: 4, price: 7.00, day: 3, description: 'Na poprawę humoru' },
      ],
      11: [
        { id: 1, category: 1, price: 10.00, day: 1, description: '' },
        { id: 2, category: 4, price: 5.00, day: 3, description: 'Drobnostki' },
      ],
      12: [
        { id: 1, category: 5, price: 121.43, day: 7, description: 'Płatność za mieszkanie' },
      ],
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
