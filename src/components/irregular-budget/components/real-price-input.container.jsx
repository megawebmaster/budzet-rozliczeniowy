import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { year } from '../../location';
import { categoryIrregularBudget } from '../irregular-budget.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregularBudget(state, ownProps).real,
  year: year(state),
  isSaving: false,
  onChange: () => {},
});

export default connect(mapStateToProps)(PriceInput);
