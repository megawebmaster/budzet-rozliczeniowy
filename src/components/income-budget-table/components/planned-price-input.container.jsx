import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryIncome } from '../income-budget-table.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIncome(state, ownProps).planned,
  isSaving: categoryIncome(state, ownProps).savingPlanned,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('income', 'planned', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
