import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import isNumber from 'lodash/isNumber';
import { Parser } from 'expr-eval';
import { Input, Label } from 'semantic-ui-react';

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

  static propTypes = {
    currencyLabel: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isSaving: PropTypes.bool,
    maximumFractionDigits: PropTypes.number.isRequired,
    minimumFractionDigits: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    help: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    isSaving: false,
    onMount: (_input) => {},
    placeholder: '',
    value: '',
    help: '',
  };

  state = {
    isEditing: false,
    error: undefined,
    focused: false,
    value: ''
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
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
    this.setState({ isEditing: false, error: undefined });
    try {
      const formula = this.state.value.toString().replace(/,/g, '.');
      const value = PriceInput.parser.parse(formula).evaluate();
      if (value !== this.props.value) {
        this.props.onChange(value);
      }
    } catch(e) {
      if (this.state.value.length > 0) {
        this.setState({ error: this.translate('validation.price.invalid', 'Nieprawidłowa wartość lub formuła') });
      }
    }
  };
  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.blur();
    }
  };

  updateValue = (_e, data) => {
    this.setState({ value: data.value });
  };

  getLoadingProps = () => {
    if (this.props.isSaving) {
      return {
        loading: true,
        iconPosition: 'left',
      };
    }

    return {};
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
    const { currencyLabel, disabled, placeholder, help } = this.props;
    const { error, isEditing } = this.state;

    return (
      <div className="input-price">
        <Input placeholder={placeholder} fluid value={this.value()} disabled={disabled} error={!!error}
               label={{ basic: true, content: currencyLabel }} labelPosition="right" onChange={this.updateValue}
               onFocus={this.focus} onBlur={this.blur} onKeyDown={this.onKeyDown} {...this.getLoadingProps()}
               ref={(element) => this.input = element} />
        {isEditing && help && !error && <Label pointing="left" color="teal">{help}</Label>}
        {isEditing && error && <Label pointing="left" color="red">{error}</Label>}
      </div>
    );
  }
}

export default injectIntl(PriceInput);

