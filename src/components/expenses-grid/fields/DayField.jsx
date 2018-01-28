import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Input, Label } from 'semantic-ui-react';

import './day-field.css';

class DayField extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  update = (_event, data) => {
    let error;

    if (data.value.length > 0) {
      const day = parseInt(data.value, 10);
      const month = this.props.month - 1;
      const year = this.props.year;
      const date = new Date(year, month, day);

      if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        error = this.format('validation.day', 'Nieprawidłowy dzień: {value}', { value: day });
      }
    }

    this.setState({ value: data.value, error });

    if (!error && data.value.length > 0) {
      // TODO: Delay updates until someone stops writing
      this.props.onUpdate(data.value);
    }
  };

  onFocus = () => {
    this.setState({ focused: true });
  };
  onBlur = () => {
    this.setState({ focused: false });
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    const { onInputMount, onKeyDown } = this.props;
    const { value, error, focused } = this.state;

    return (
      <div className="input-day">
        <Input fluid value={value} onChange={this.update} onKeyDown={onKeyDown} error={!!error} ref={onInputMount}
               onFocus={this.onFocus} onBlur={this.onBlur} />
        {focused && error && <Label pointing="left" color="red">{error}</Label>}
      </div>
    );
  }
}

DayField.defaultProps = {
  onInputMount: (_type, _input) => {},
  onKeyPress: (_event, _data) => {},
};
DayField.propTypes = {
  month: PropTypes.number.isRequired,
  onInputMount: PropTypes.func,
  onKeyDown: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  year: PropTypes.number.isRequired,
};

export default injectIntl(DayField);

