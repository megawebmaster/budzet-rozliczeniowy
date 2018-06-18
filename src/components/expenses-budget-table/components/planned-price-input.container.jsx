import { connect } from 'react-redux';

import { PriceInputWithAverage } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryExpenses } from '../expenses-budget-table.selectors';
import { expenseCategory } from '../../categories';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryExpenses(state, ownProps).plan;

  return ({
    value: entry.encoded ? 0 : entry.value,
    error: entry.error,
    isSaving: entry.saving,
    average: expenseCategory(state, ownProps).averageValue,
  });
};
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('expense', 'plan', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInputWithAverage);
