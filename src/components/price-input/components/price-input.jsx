import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { Input, Label } from 'semantic-ui-react';

import './price-input.css';

export default class extends Component {
  static propTypes = {
    currencyLabel: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool.isRequired,
    help: PropTypes.string,
    isSaving: PropTypes.bool,
    maximumFractionDigits: PropTypes.number.isRequired,
    minimumFractionDigits: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onMount: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    help: '',
    isSaving: false,
    placeholder: '',
    value: '',
    onKeyDown: (_event) => {},
    onMount: (_input) => {},
  };

  state = {
    focused: false,
  };

  currency = (value) => this.props.intl.formatNumber(value, {
    style: 'decimal',
    minimumFractionDigits: this.props.minimumFractionDigits,
    maximumFractionDigits: this.props.maximumFractionDigits,
  });

  value = () => {
    const { value } = this.props;

    if (!isNumber(value)) {
      return value;
    }

    let result = this.currency(value);

    return this.state.focused ? result.replace(/\s+/g, '') : result;
  };

  focus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
    this.input.inputRef.select();
  };

  blur = () => {
    this.setState({ focused: false });
    this.props.onChange(this.props.value, { editing: false });
    this.props.onBlur();
  };

  onKeyDown = (event) => {
    this.props.onKeyDown(event, { editing: false });
    if (event.keyCode === 13) {
      this.props.onChange(this.props.value, { editing: false });
    }
  };

  updateValue = (_e, data) => this.props.onChange(data.value, { editing: this.state.focused });
  saveRef = (input) => this.input = input;

  getLoadingProps = () => {
    if (this.props.isSaving) {
      return {
        loading: true,
        iconPosition: 'left',
      };
    }

    return {};
  };

  componentDidMount() {
    const { onMount, disabled } = this.props;

    if (!disabled) {
      onMount(this.input);
    }
  }

  render() {
    const { currencyLabel, disabled, placeholder, help, error } = this.props;
    const { focused } = this.state;

    return (
      <div className="input-price">
        <Input placeholder={placeholder} fluid value={this.value()} disabled={disabled} error={error}
               label={{ basic: true, content: currencyLabel }} labelPosition="right" onChange={this.updateValue}
               onFocus={this.focus} onBlur={this.blur} onKeyDown={this.onKeyDown} {...this.getLoadingProps()}
               ref={this.saveRef} />
        {focused && help && !error && <Label pointing="left" color="teal">{help}</Label>}
      </div>
    );
  }
}

