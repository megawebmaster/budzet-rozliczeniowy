import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { PriceInputContainer as PriceInput } from './price-input.container';

class PriceInputWithAverage extends PureComponent {
  static propTypes = {
    average: PropTypes.number,
    disabled: PropTypes.bool,
    isSaving: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any,
  };

  static defaultProps = {
    average: 0,
    disabled: false,
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
    const { average, currencyLabel, disabled, isSaving, onChange, onMount, placeholder, value } = this.props;
    const help = this.format(
      'price-input.average-help',
      'Średnio: {value} {currency}',
      { value: this.currency(average), currency: currencyLabel }
    );

    return (
      <PriceInput disabled={disabled} isSaving={isSaving} onChange={onChange} onMount={onMount} value={value}
                  placeholder={placeholder} help={help} />
    );
  }
}

export default injectIntl(PriceInputWithAverage);

