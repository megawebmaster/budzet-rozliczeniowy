import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { categoryIrregularBudget } from '../irregular-budget.selectors';
import { saveIrregularValue } from '../irregular-budget.actions';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryIrregularBudget(state, ownProps).plan;

  return ({
    value: entry.encrypted ? 0 : entry.value,
    decrypted: !entry.encrypted,
    error: entry.error,
    isSaving: entry.saving,
  });
};
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveIrregularValue(categoryId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
