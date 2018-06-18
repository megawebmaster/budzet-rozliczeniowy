import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryIncome } from '../income-budget-table.selectors';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryIncome(state, ownProps).plan;

  return ({
    value: entry.encoded ? 0 : entry.value,
    error: entry.error,
    isSaving: entry.saving,
  });
};
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('income', 'plan', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
