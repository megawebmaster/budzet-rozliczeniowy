import { connect } from 'react-redux';

import { PriceInputWithAverage } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryExpenses } from '../expenses-budget-table.selectors';
import { expenseCategory } from '../../categories';

const mapStateToProps = (state, ownProps) => ({
  value: categoryExpenses(state, ownProps).planned,
  isSaving: categoryExpenses(state, ownProps).savingPlanned,
  average: expenseCategory(state, ownProps).averageValue,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('expense', 'planned', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInputWithAverage);
