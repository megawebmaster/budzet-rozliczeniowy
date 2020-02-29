import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

export default class DescriptionField extends Component {
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

  mountInput = (props, input) => {
    const { onInputMount, disabled } = props;

    if (!disabled && input) {
      onInputMount({ inputRef: input });
    }
  };

  saveRef = (input) => {
    if (input && input.inputRef) {
      this.input = input.inputRef.current;
      this.mountInput(this.props, input.inputRef.current);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.mountInput(nextProps, this.input);
  }

  render() {
    const { disabled, error, value, onBlur, onFocus, onKeyDown } = this.props;

    return <Input fluid value={value} disabled={disabled} onChange={this.onChange} error={error} onFocus={onFocus}
                  onBlur={onBlur} onKeyDown={onKeyDown} ref={this.saveRef} />;
  }
}

