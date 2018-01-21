import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import isNumber from 'lodash/isNumber';
import { Parser } from 'expr-eval';
import { Input } from 'semantic-ui-react';

import './price-input.css';

// TODO: Show data-saving errors
class PriceInput extends Component {
  static parser = new Parser({
    allowMemberAccess: false,
    operators: {
      add: true,
      comparison: false,
      concatenate: false,
      conditional: false,
      divide: true,
      factorial: false,
      logical: false,
      multiply: true,
      power: false,
      remainder: false,
      subtract: true,
      sin: false,
      cos: false,
      tan: false,
      asin: false,
      acos: false,
      atan: false,
      sinh: false,
      cosh: false,
      tanh: false,
      asinh: false,
      acosh: false,
      atanh: false,
      sqrt: false,
      log: false,
      ln: false,
      lg: false,
      log10: false,
      abs: false,
      ceil: false,
      floor: false,
      round: false,
      trunc: false,
      exp: false,
      length: false,
      in: false
    }
  });

  state = {
    isEditing: false,
    error: false,
    value: ''
  };

  currency = (value) => this.props.intl.formatNumber(value, {
    style: 'decimal',
    minimumFractionDigits: this.props.minimumFractionDigits,
    maximumFractionDigits: this.props.maximumFractionDigits,
  });

  value = () => {
    const { isEditing, value } = this.state;

    if (!isNumber(value)) {
      return value;
    }

    let result = this.currency(value);

    return isEditing ? result.replace(/\s+/g, '') : result;
  };

  focus = () => {
    this.setState({ isEditing: true }, () => {
      this.input.inputRef.select();
    });
  };
  blur = () => {
    this.setState({ isEditing: false, error: false });
    try {
      const formula = this.state.value.toString().replace(/,/g, '.');
      const value = PriceInput.parser.parse(formula).evaluate();
      if (value !== this.props.value) {
        this.props.onChange(value);
      }
    } catch(e) {
      this.setState({ error: true });
    }
  };
  onKeyPress = (event) => {
    if (event.charCode === 13) {
      this.blur();
    }
  };

  updateValue = (_e, data) => {
    this.setState({ value: data.value });
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentDidMount() {
    const { onMount, disabled } = this.props;

    if (!disabled) {
      onMount(this.input);
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  render() {
    const { currencyLabel, disabled, isSaving, placeholder } = this.props;
    const { error } = this.state;

    return <Input className="price-input" placeholder={placeholder} fluid value={this.value()} disabled={disabled}
                  label={{ basic: true, content: currencyLabel }} labelPosition="right" onChange={this.updateValue}
                  onFocus={this.focus} onBlur={this.blur} ref={(element) => this.input = element} loading={isSaving}
                  iconPosition="left" error={error} onKeyPress={this.onKeyPress} />;
  }
}

PriceInput.defaultProps = {
  disabled: false,
  isSaving: false,
  onMount: (_input) => {},
  placeholder: '',
  value: '',
};
PriceInput.propTypes = {
  currencyLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isSaving: PropTypes.bool,
  maximumFractionDigits: PropTypes.number.isRequired,
  minimumFractionDigits: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

export default injectIntl(PriceInput);

