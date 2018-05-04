import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { categoryIrregularBudget } from '../irregular-budget.selectors';
import { saveIrregularValue } from '../irregular-budget.actions';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregularBudget(state, ownProps).planned,
  isSaving: categoryIrregularBudget(state, ownProps).savingPlanned,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveIrregularValue(categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
