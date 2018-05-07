import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { errors, isLoading } from '../../components/expenses';
import { month, year } from '../../components/location';
import ExpensesView from './expenses.view';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  errors: errors(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(injectIntl(ExpensesView));

