import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryIncome } from '../income-budget-table.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIncome(state, ownProps).real,
  error: categoryIncome(state, ownProps).errorReal,
  isSaving: categoryIncome(state, ownProps).savingReal,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('income', 'real', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
