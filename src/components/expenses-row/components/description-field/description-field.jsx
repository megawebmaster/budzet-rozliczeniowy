import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

export default class extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool.isRequired,
    value: PropTypes.any.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
    onKeyDown: PropTypes.func,
  };
  static defaultProps = {
    disabled: false,
    onInputMount: (_type, _input) => {},
    onKeyDown: (_event, _data) => {},
  };

  onChange = (_event, data) => this.props.onChange(data.value);

  render() {
    const { disabled, error, value, onBlur, onFocus, onInputMount, onKeyDown } = this.props;

    return <Input fluid value={value} disabled={disabled} onChange={this.onChange} error={error} onFocus={onFocus}
                  onBlur={onBlur} onKeyDown={onKeyDown} ref={onInputMount} />;
  }
}

