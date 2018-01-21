import { connect } from 'react-redux';

import PriceInput from '../components/price-input/PriceInput';

const mapStateToProps = (state) => ({
  currencyLabel: state.configuration.currency.sign,
  maximumFractionDigits: state.configuration.currency.maximumFractionDigits,
  minimumFractionDigits: state.configuration.currency.minimumFractionDigits,
});

export default connect(mapStateToProps)(PriceInput);
