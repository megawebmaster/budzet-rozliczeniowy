import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { updateYears } from '../components/configuration';

export const routesEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .mergeMap(() => (
      Observable.from(fetch('http://localhost:8080/budgets').then(response => response.json()))
        .map(years => updateYears(years))
    ))
;
