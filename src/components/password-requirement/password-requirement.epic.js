import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';

import { clearActions, CONTINUE_ACTIONS } from './password-requirement.actions';
import { actions as actionsSelector } from './password-requirement.selectors';

const continueActionsEpic = (action$, store) =>
  action$
    .ofType(CONTINUE_ACTIONS)
    .concatMap(() => {
      const state = store.getState();
      const actions = actionsSelector(state);

      return Observable.of([
        ...actions,
        clearActions()
      ]).mergeAll();
    })
;

export const passwordRequirementEpic = combineEpics(
  continueActionsEpic
);
