import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import { Input } from 'semantic-ui-react';

import './price-input.css';

class PriceInput extends Component {
  state = {
    isEditing: false,
    error: false,
    value: ''
  };

  currency = (value) => this.props.intl.formatNumber(value, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
    const value = parseFloat(this.state.value.toString().replace(',', '.'));
    if (isNaN(value)) {
      this.setState({ error: true });
    } else {
      this.props.onChange(value);
    }
  };

  updateValue = (_e, data) => {
    this.setState({ value: data.value });
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  render() {
    const { disabled, isSaving, placeholder } = this.props;
    const { error } = this.state;

    return <Input className="price-input" placeholder={placeholder} fluid value={this.value()} disabled={disabled}
                  label={{ basic: true, content: 'zł' }} labelPosition="right" onChange={this.updateValue}
                  onFocus={this.focus} onBlur={this.blur} ref={(element) => this.input = element} loading={isSaving}
                  iconPosition="left" error={error} />;
  }
}

PriceInput.defaultProps = {
  disabled: false,
  isSaving: false,
  placeholder: '',
  value: '',
};
PriceInput.propTypes = {
  disabled: PropTypes.bool,
  isSaving: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

export default injectIntl(PriceInput);

