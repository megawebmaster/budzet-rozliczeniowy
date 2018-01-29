import { connect } from 'react-redux';

import { currencyLabel, maximumFractionDigits, minimumFractionDigits } from '../../configuration';
import PriceInput from './price-input';

const mapStateToProps = (state) => ({
  currencyLabel: currencyLabel(state),
  maximumFractionDigits: maximumFractionDigits(state),
  minimumFractionDigits: minimumFractionDigits(state),
});

export const PriceInputContainer = connect(mapStateToProps)(PriceInput);
