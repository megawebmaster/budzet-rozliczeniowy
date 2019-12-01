import { connect } from 'react-redux';

import BudgetView from './budget';
import { expensesCategories, incomeCategories, savingsCategories } from '../../categories';

const mapStateToProps = (state) => ({
  expensesCategories: expensesCategories(state),
  incomeCategories: incomeCategories(state),
  savingsCategories: savingsCategories(state),
});

export default connect(mapStateToProps)(BudgetView);

