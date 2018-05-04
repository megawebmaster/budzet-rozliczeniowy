import { connect } from 'react-redux';

import BudgetView from './budget';
import { expensesCategories, incomeCategories } from '../../categories';

const mapStateToProps = (state) => ({
  expensesCategories: expensesCategories(state),
  incomeCategories: incomeCategories(state),
});

export default connect(mapStateToProps)(BudgetView);

