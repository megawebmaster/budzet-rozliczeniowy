import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import './error-field.css';

const ErrorField = (WrappedComponent, { validator }) => class extends Component {
  static propTypes = {
    error: PropTypes.string,
    errorPosition: PropTypes.oneOf(['left', 'right']),
    intl: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  };

  static defaultProps = {
    error: '',
    errorPosition: 'right',
    onCancel: () => {},
  };

  state = {
    error: '',
    focused: false,
    value: '',
  };

  format = (id, params) => this.props.intl.formatMessage({ id }, params);
  onFocus = () => this.setState({ focused: true });
  onBlur = () => this.setState({ focused: false });
  labelPointing = () => this.props.errorPosition === 'left' ? 'right' : 'left';

  validate = (value, options = {}) => {
    if (value === this.props.value) {
      return;
    }

    try {
      this.props.onChange(validator(value, options));
    } catch(e) {
      this.props.onCancel();
      const error = e.message ? this.format(e.message, { value }) : '';
      this.setState({ error, value });
    }
  };

  componentDidMount() {
    this.setState({ error: this.props.error, value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.error, value: nextProps.value });
  }

  render() {
    const { error, focused, value } = this.state;
    const { error: _error, errorPosition: _errorPosition, value: _value, ...props } = this.props;

    return (
      <div className="error-field">
        <WrappedComponent {...props} value={value} error={!!error} onChange={this.validate} onFocus={this.onFocus}
                          onBlur={this.onBlur} />
        {focused && error && <Label pointing={this.labelPointing()} color="red">{error}</Label>}
      </div>
    );
  }
};

export default ErrorField;
