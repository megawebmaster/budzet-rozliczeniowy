import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { saveValue } from '../../budget';
import { categorySavings } from '../savings-budget-table.selectors';

const mapStateToProps = (state, ownProps) => {
  const entry = categorySavings(state, ownProps).real;

  return ({
    value: entry.encrypted ? 0 : entry.value,
    decrypted: !entry.encrypted,
    error: entry.error,
    isSaving: entry.saving,
  });
};
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('saving', 'real', categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
