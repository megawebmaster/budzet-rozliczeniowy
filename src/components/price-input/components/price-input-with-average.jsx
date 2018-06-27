import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { PriceInputContainer as PriceInput } from './price-input.container';

class PriceInputWithAverage extends PureComponent {
  static propTypes = {
    average: PropTypes.number,
    currencyLabel: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    decrypted: PropTypes.bool,
    isSaving: PropTypes.bool,
    maximumFractionDigits: PropTypes.number.isRequired,
    minimumFractionDigits: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any,
  };

  static defaultProps = {
    average: 0,
    disabled: false,
    decrypted: false,
    isSaving: false,
    onMount: (_input) => {},
    placeholder: '',
    value: '',
  };

  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, {
    style: 'decimal',
    minimumFractionDigits: this.props.minimumFractionDigits,
    maximumFractionDigits: this.props.maximumFractionDigits,
  });

  render() {
    const { average, currencyLabel, disabled, decrypted, isSaving, onChange, onMount, placeholder, value } = this.props;

    const help = this.format(
      'price-input.average-help',
      'Średnio: {value} {currency}',
      { value: this.currency(average), currency: currencyLabel }
    );

    return (
      <PriceInput disabled={disabled} decrypted={decrypted} isSaving={isSaving} value={value} placeholder={placeholder}
                  help={help} onChange={onChange} onMount={onMount} />
    );
  }
}

export default injectIntl(PriceInputWithAverage);

