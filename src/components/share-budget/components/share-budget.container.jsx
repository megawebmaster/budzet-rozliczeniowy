import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import ShareBudget from './share-budget';
import { currentBudget } from '../../configuration';
import { loadMembers, removeBudgetMember, shareBudget } from '../share-budget.actions';
import { isSharing, members, sharingError } from '../share-budget.selectors';

const mapStateToProps = (state) => ({
  budget: currentBudget(state),
  saving: isSharing(state),
  error: sharingError(state),
  members: members(state),
});
const mapDispatchToProps = (dispatch) => ({
  loadMembers: (budget) => dispatch(loadMembers(budget)),
  removeBudgetMember: (budget, member) => dispatch(removeBudgetMember(budget, member)),
  shareBudget: (budget, recipient) => dispatch(shareBudget(budget, recipient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShareBudget));
