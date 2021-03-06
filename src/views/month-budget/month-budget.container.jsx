import { connect } from 'react-redux';

import { errors, isLoading } from '../../components/budget';
import { month, year } from '../../components/location';
import MonthBudgetView from './month-budget.view';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  errors: errors(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(MonthBudgetView);

