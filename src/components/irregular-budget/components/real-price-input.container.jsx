import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { categoryIrregularBudget } from '../irregular-budget.selectors';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryIrregularBudget(state, ownProps).real;

  return ({
    value: entry.encrypted ? 0 : entry.value,
    error: entry.error,
    isSaving: false,
    onChange: () => {},
  });
};

export default connect(mapStateToProps)(PriceInput);
