import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './rootSaga';
import routesMap from './../routes';

import user from './user/UserReducer';
import configuration from './configuration/ConfigurationReducer';
import categories from './categories/CategoriesReducer';
import budget from './budget/BudgetReducer';
import irregular_budget from './irregular_budget/IrregularBudgetReducer';
import expenses from './expenses/ExpensesReducer';

const history = createHistory();
const { reducer: locationReducer, middleware: locationMiddleware, enhancer } = connectRoutes(history, routesMap);

const rootReducer = combineReducers({
  location: locationReducer,
  user,
  categories,
  budget,
  irregular_budget,
  expenses,
  configuration,
});

const sagaMiddleware = createSagaMiddleware();
const initialState = {
  categories: {
    income: [
      {name: 'Wynagrodzenie', id: 6},
      {name: 'Premie', id: 7},
      {name: 'Odsetki bankowe', id: 8},
    ],
    expenses: [
      {
        name: 'Jedzenie', id: 9, children: [
          {name: 'Dom', id: 1},
          {name: 'Praca', id: 2},
          {name: 'Miasto', id: 3},
          {name: 'Słodycze', id: 4},
        ],
      },
      {
        name: 'Mieszkanie', id: 10, children: [
          {name: 'Czynsz', id: 5},
        ],
      },
    ],
    irregular: [
      {name: 'Leczenie', id: 11},
      {name: 'Samochód', id: 12},
      {name: 'Emerytura', id: 13},
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
      irregular: {
        10: {
          11: {
            planned: 500.00,
            real: 200.00,
          },
          12: {
            planned: 700.00,
            real: 600.00,
          },
          13: {
            planned: 4000.00,
            real: 4000.00,
          },
        },
        11: {
          11: {
            planned: 500.00,
            real: 400.00,
          },
          12: {
            planned: 700.00,
            real: 1200.00,
          },
          13: {
            planned: 4000.00,
            real: 1200.00,
          },
        },
        12: {
          11: {
            planned: 500.00,
            real: 350.00,
          },
          12: {
            planned: 700.00,
            real: 1000.00,
          },
          13: {
            planned: 4000.00,
            real: 3800.00,
          },
        },
      },
    },
  },
  irregular_budget: {
    2017: {
      11: {
        planned: 5000.00,
        real: 2300.00,
      },
      12: {
        planned: 7000.00,
        real: 0.00,
      },
      13: {
        planned: 40000.00,
        real: 150.00,
      },
    },
  },
  expenses: {
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
  },
  configuration: {
    locale: 'pl',
    currency: {
      type: 'PLN',
      sign: 'zł',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    },
    years: [2017, 2018],
  },
};
export default createStore(
  rootReducer,
  initialState,
  compose(enhancer, applyMiddleware(locationMiddleware, sagaMiddleware))
);
export { rootReducer };
sagaMiddleware.run(rootSaga);
