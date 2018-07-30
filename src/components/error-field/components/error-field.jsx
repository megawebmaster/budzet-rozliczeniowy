import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import './error-field.css';

const ErrorField = (WrappedComponent, { validator }) => class ErrorField extends Component {
  static propTypes = {
    error: PropTypes.string,
    errorPosition: PropTypes.oneOf(['left', 'right']),
    intl: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    value: PropTypes.any.isRequired,
  };

  static defaultProps = {
    error: '',
    errorPosition: 'right',
    onCancel: () => {},
    onKeyDown: (_event) => {},
  };

  state = {
    error: '',
    focused: false,
    value: '',
  };

  format = (id, params) => this.props.intl.formatMessage({ id }, params);
  translateError = (id) => !id ? '' : this.props.intl.formatMessage({ id, defaultMessage: id });
  labelPointing = () => this.props.errorPosition === 'left' ? 'right' : 'left';
  onFocus = () => this.setState({ focused: true });
  onBlur = () => this.setState({ focused: false });

  onKeyDown = (event, options = {}) => {
    if (event.keyCode === 13) {
      try {
        validator(event.target.value, options);
        this.props.onKeyDown(event);
      } catch(e) {
        const error = e.message ? this.format(e.message, { value: event.target.value }) : '';
        if (error) {
          event.preventDefault();
          event.stopPropagation();
          this.props.onCancel();
        }
        this.setState({ error, value: event.target.value });
      }
    }
  };

  validate = (value, options = {}) => {
    try {
      this.props.onChange(validator(value, options));
    } catch(e) {
      this.props.onCancel();
      const error = e.message ? this.format(e.message, { value }) : '';
      this.setState({ error, value });
    }
  };

  componentDidMount() {
    this.setState({ error: this.translateError(this.props.error), value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: this.translateError(nextProps.error), value: nextProps.value });
  }

  render() {
    const { error, focused, value } = this.state;
    const { error: _error, errorPosition: _errorPosition, value: _value, ...props } = this.props;

    return (
      <div className="error-field">
        <WrappedComponent {...props} value={value} error={!!error} onChange={this.validate} onFocus={this.onFocus}
                          onBlur={this.onBlur} onKeyDown={this.onKeyDown} />
        {focused && error && <Label pointing={this.labelPointing()} color="red">{error}</Label>}
      </div>
    );
  }
};

export default ErrorField;
