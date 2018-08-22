import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import BudgetAccessForm from './budget-access-form';
import { access, formErrors, isChecking } from '../budget-access-form.selectors';
import { saveBudgetAccess } from '../budget-access-form.actions';

const mapStateToProps = (state) => ({
  budgetAccess: access(state),
  errors: formErrors(state),
  loading: isChecking(state),
});
const mapDispatchToProps = (dispatch) => ({
  saveAccess: (budgetAccess, recipient, name, password) =>
    dispatch(saveBudgetAccess(budgetAccess, recipient, name, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BudgetAccessForm));
