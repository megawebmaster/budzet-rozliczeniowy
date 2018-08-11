export const LOAD_MEMBERS = 'ShareBudgetAction.LOAD_MEMBERS';
export const UPDATE_MEMBERS = 'ShareBudgetAction.UPDATE_MEMBERS';
export const SHARE_BUDGET = 'ShareBudgetAction.SHARE_BUDGET';
export const SHARE_BUDGET_SUCCESS = 'ShareBudgetAction.SHARE_BUDGET_SUCCESS';
export const SHARE_BUDGET_FAIL = 'ShareBudgetAction.SHARE_BUDGET_FAIL';
export const REMOVE_BUDGET_MEMBER = 'ShareBudgetAction.REMOVE_BUDGET_MEMBER';
export const REMOVE_BUDGET_MEMBER_SUCCESS = 'ShareBudgetAction.REMOVE_BUDGET_MEMBER_SUCCESS';
export const REMOVE_BUDGET_MEMBER_FAIL = 'ShareBudgetAction.REMOVE_BUDGET_MEMBER_FAIL';

export const loadMembers = (budget) => ({
  type: LOAD_MEMBERS,
  payload: { budget }
});

export const updateMembers = (members) => ({
  type: UPDATE_MEMBERS,
  payload: { members }
});

export const shareBudget = (budget, recipient) => ({
  type: SHARE_BUDGET,
  payload: { budget, recipient },
});

export const removeBudgetMember = (budget, member) => ({
  type: REMOVE_BUDGET_MEMBER,
  payload: { budget, member },
});
