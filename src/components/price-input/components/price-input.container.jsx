import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { currencyLabel, maximumFractionDigits, minimumFractionDigits } from '../../configuration';
import { ErrorField } from '../../error-field';
import { PriceValidator } from '../../../validators';
import PriceInput from './price-input';

const mapStateToProps = (state) => ({
  currencyLabel: currencyLabel(state),
  maximumFractionDigits: maximumFractionDigits(state),
  minimumFractionDigits: minimumFractionDigits(state),
});

export const PriceInputContainer = connect(mapStateToProps)(injectIntl(ErrorField(PriceInput, { validator: PriceValidator })));

const simpleMapStateToProps = (state) => ({
  ...mapStateToProps(state),
  decrypted: true,
  isSaving: false,
  onChange: () => {},
});
export const SimplePriceInputContainer = connect(simpleMapStateToProps)(injectIntl(ErrorField(PriceInput, { validator: PriceValidator })));
