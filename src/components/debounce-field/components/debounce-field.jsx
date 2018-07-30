import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DebounceField = (WrappedComponent) => class DebounceField extends Component {
  static propTypes = {
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    error: '',
    debounceTime: 1000,
  };

  state = {
    value: '',
    error: '',
  };

  onChange = (value) => {
    this.setState({ value, error: '' });
    this.cancel();
    this.timeout = setTimeout(() => {
      this.props.onChange(value);
      this.timeout = null;
    }, this.props.debounceTime);
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.cancel();
      this.props.onChange(this.state.value);
    }
  };

  cancel = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  componentDidMount() {
    this.setState({ value: this.props.value, error: this.props.error });
  }

  componentWillReceiveProps(nextProps) {
    this.cancel();
    this.setState({ value: nextProps.value, error: nextProps.error });
  }

  render() {
    const { value, error } = this.state;
    const { onUpdate: _onUpdate, ...props } = this.props;

    return (
      <WrappedComponent {...props} error={error} value={value} onChange={this.onChange} onCancel={this.cancel}
                        onKeyDown={this.onKeyDown} />
    );
  }
};

export default DebounceField;
