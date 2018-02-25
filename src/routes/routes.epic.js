import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { updateYears } from '../components/configuration';
import { loadCategories } from '../components/categories';

const fetchAvailableYears = () => (
  fetch('http://localhost:8080/budgets').then(response => response.json())
);
const fetchCategories = () => (
  fetch('http://localhost:8080/categories').then(response => response.json())
);

export const routesEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .mergeMap(() => (
      Observable.of(
        Observable.from(fetchAvailableYears()).map(years => updateYears(years)),
        Observable.from(fetchCategories()).map(categories => loadCategories(categories))
      ).mergeAll()
    ))
;
