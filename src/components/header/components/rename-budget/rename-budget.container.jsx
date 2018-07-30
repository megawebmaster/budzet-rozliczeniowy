import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import RenameBudget from './rename-budget';
import { currentBudget, currentBudgetError, renameBudget, savingCurrentBudget } from '../../../configuration';

const mapStateToProps = (state) => ({
  budget: currentBudget(state),
  saving: savingCurrentBudget(state),
  error: currentBudgetError(state),
});
const mapDispatchToProps = (dispatch) => ({
  renameBudget: (budget, name) => dispatch(renameBudget(budget, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RenameBudget));
