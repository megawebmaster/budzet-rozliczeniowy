import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import './day-field.css';

export default class extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    value: PropTypes.any.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
    onKeyDown: PropTypes.func,
  };
  static defaultProps = {
    onInputMount: (_type, _input) => {},
    onKeyDown: (_event) => {},
  };

  onChange = (_event, data) => this.props.onChange(data.value, { year: this.props.year, month: this.props.month });
  onKeyDown = (event) => this.props.onKeyDown(event, { year: this.props.year, month: this.props.month });

  render() {
    const { error, value, onBlur, onFocus, onInputMount } = this.props;

    return <Input fluid className="input-day" value={value} onChange={this.onChange} error={error} onFocus={onFocus}
                  onBlur={onBlur} onKeyDown={this.onKeyDown} ref={onInputMount} />;
  }
}
