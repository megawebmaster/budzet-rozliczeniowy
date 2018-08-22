import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import AccessBudgetView from './access-budget.view';
import { errors, isLoading } from '../../components/budget-access-form';

const mapStateToProps = (state) => ({
  errors: errors(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(injectIntl(AccessBudgetView));

