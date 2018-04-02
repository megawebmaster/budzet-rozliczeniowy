import { connect } from 'react-redux';

import { currencyLabel, maximumFractionDigits, minimumFractionDigits } from '../../configuration';
import PriceInputWithAverage from './price-input-with-average';

const mapStateToProps = (state) => ({
  currencyLabel: currencyLabel(state),
  maximumFractionDigits: maximumFractionDigits(state),
  minimumFractionDigits: minimumFractionDigits(state),
});

export const PriceInputWithAverageContainer = connect(mapStateToProps)(PriceInputWithAverage);
