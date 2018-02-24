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
};
const epicMiddleware = createEpicMiddleware(appEpic);
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
