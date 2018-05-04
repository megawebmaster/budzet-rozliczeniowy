import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { categoryIrregular } from '../irregular-budget-table.selectors';
import { year } from '../../location';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregular(state, ownProps).planned,
  year: year(state),
  disabled: true,
  isSaving: false,
  onChange: () => {},
});

export default connect(mapStateToProps)(PriceInput);
