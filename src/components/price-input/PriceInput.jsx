import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { isNumber } from 'lodash';
import { Input } from 'semantic-ui-react';

import './price-input.css';

class PriceInput extends Component {
  state = {
    isEditing: false,
  };

  currency = (value) => this.props.intl.formatNumber(value, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  value = () => {
    const { value } = this.props;
    const { isEditing } = this.state;

    return isEditing || !isNumber(value) ? value : this.currency(value);
  };

  focus = () => {
    this.setState({ isEditing: true });
  };
  blur = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { onChange, disabled, placeholder } = this.props;

    return <Input className="price-input" placeholder={placeholder} fluid value={this.value()} disabled={disabled}
                  label={{ basic: true, content: 'zł' }} labelPosition="right" onChange={onChange} onFocus={this.focus}
                  onBlur={this.blur} />;
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

