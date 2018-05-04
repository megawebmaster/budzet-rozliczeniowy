import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryExpenses } from '../expenses-budget-table.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryExpenses(state, ownProps).real,
  isSaving: categoryExpenses(state, ownProps).savingReal,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('expense', 'real', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
