import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryExpenses } from '../expenses-budget-table.selectors';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryExpenses(state, ownProps).real;

  return ({
    value: entry.encrypted ? 0 : entry.value,
    decrypted: !entry.encrypted,
    isSaving: entry.saving,
  });
};
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('expense', 'real', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
