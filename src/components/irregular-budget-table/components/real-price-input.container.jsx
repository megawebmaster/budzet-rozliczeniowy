import { connect } from 'react-redux';

import { PriceInput } from '../../price-input';
import { categoryIrregular } from '../irregular-budget-table.selectors';
import { year } from '../../location';

const mapStateToProps = (state, ownProps) => {
  const entry = categoryIrregular(state, ownProps).real;

  return ({
    value: entry.encrypted ? 0 : entry.value,
    decrypted: !entry.encrypted,
    year: year(state),
    disabled: true,
    isSaving: false,
    onChange: () => {},
  });
};

export default connect(mapStateToProps)(PriceInput);
