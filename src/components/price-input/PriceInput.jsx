import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { isNumber } from 'lodash';
import { Input } from 'semantic-ui-react';

import './price-input.css';

class PriceInput extends Component {
  state = {
    isEditing: false,
    value: 0
  };

  currency = (value) => this.props.intl.formatNumber(value, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  value = () => {
    const { value } = this.state;

    return !isNumber(value) ? value : this.currency(value);
  };

  focus = () => {
    this.setState({ isEditing: true });
  };
  blur = () => {
    this.setState({ isEditing: false });
    this.props.onChange(this.state.value.toString().replace(',', '.'));
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
    const { disabled, placeholder } = this.props;

    return <Input className="price-input" placeholder={placeholder} fluid value={this.value()} disabled={disabled}
                  label={{ basic: true, content: 'zł' }} labelPosition="right" onChange={this.updateValue}
                  onFocus={this.focus} onBlur={this.blur} />;
  }
}

PriceInput.defaultProps = {
  disabled: false,
  placeholder: '',
  value: null,
};
PriceInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};

export default injectIntl(PriceInput);

