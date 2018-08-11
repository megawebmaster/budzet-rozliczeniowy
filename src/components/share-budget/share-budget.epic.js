import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';

import { Authenticator } from '../../App.auth';
import * as Actions from './share-budget.actions';
import { updateMembers } from './share-budget.actions';
import { Encryptor } from '../../App.encryption';

/**
 * @param budget string
 * @returns {Promise<[any]>}
 */
const fetchMembers = async (budget) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/accesses`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

/**
 * @param budget string
 * @param values object
 * @returns {Promise<boolean>}
 */
const shareBudgetAction = async (budget, values) => {
  const recipient = await Encryptor.encrypt(budget, values.email);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/accesses`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({ ...values, recipient }),
    method: 'POST',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

/**
 * @param budget string
 * @param memberId int
 * @returns {Promise<boolean>}
 */
const removeBudgetMemberAction = async (budget, memberId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/accesses/${memberId}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'DELETE',
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error);
  }

  return await true;
};

const loadBudgetMemberEpic = (action$) =>
  action$
    .ofType(Actions.LOAD_MEMBERS)
    .mergeMap((action) => Observable
        .from(fetchMembers(action.payload.budget.slug))
        .map(members => members.map(async member => ({
          ...member,
          name: await Encryptor.decrypt(action.payload.budget.slug, member.recipient),
          abilities: ['view', 'edit', 'share'],
        })))
        .mergeMap(promises => Observable
          .from(Promise.all(promises))
          .map(members => updateMembers(members))
        )
      // .catch(error => Observable.of(addBudgetError(error.message)));
    )
;

const addBudgetMemberEpic = (action$) =>
  action$
    .ofType(Actions.SHARE_BUDGET)
    .concatMap(action => Observable
      .from(shareBudgetAction(action.payload.budget.slug, { email: action.payload.recipient }))
      .map((result) => ({
        type: Actions.SHARE_BUDGET_SUCCESS,
        payload: {
          member: {
            ...result,
            name: action.payload.recipient,
            abilities: ['view', 'edit', 'share'],
          }
        },
      }))
      .catch(error => Observable.of({
        type: Actions.SHARE_BUDGET_FAIL,
        error: error.message,
      }))
    )
;

const removeBudgetMemberEpic = (action$) =>
  action$
    .ofType(Actions.REMOVE_BUDGET_MEMBER)
    .concatMap(action => Observable
      .from(removeBudgetMemberAction(action.payload.budget.slug, action.payload.member.id))
      .ignoreElements()
      .catch(error => Observable.of({
        type: Actions.REMOVE_BUDGET_MEMBER_FAIL,
        payload: { member: action.payload.member },
        error: error.message,
      }))
    )
;

export const shareBudgetEpic = combineEpics(
  loadBudgetMemberEpic,
  addBudgetMemberEpic,
  removeBudgetMemberEpic,
);
