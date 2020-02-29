import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Input } from 'semantic-ui-react';

import 'react-day-picker/lib/style.css';
import './day-field.css';

export default class DayField extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
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
    disabled: false,
    onInputMount: (_type, _input) => {},
    onKeyDown: (_event) => {},
  };

  onChange = (day) => day && this.props.onChange(day.getDate().toString(), {
    year: this.props.year,
    month: this.props.month
  });
  onKeyDown = (event) => this.props.onKeyDown(event, { year: this.props.year, month: this.props.month });

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

  parseDate = (value) => {
    const day = parseInt(value, 10);
    if (day < 1 || day > 31) {
      return undefined;
    }
    const { year, month } = this.props;

    return new Date(year, month - 1, day);
  };
  formatDate = (date) => date.getDate().toString();

  componentWillReceiveProps(nextProps) {
    this.mountInput(nextProps, this.input);
  }

  render() {
    const { value } = this.props;

    return <DayPickerInput
      component={Input}
      placeholder=""
      format="D"
      value={value.toString()}
      onDayChange={this.onChange}
      formatDate={this.formatDate}
      parseDate={this.parseDate}
      inputProps={{
        className: 'input-day',
        disabled: this.props.disabled,
        error: this.props.error,
        fluid: true,
        ref: this.saveRef
      }}
      dayPickerProps={{
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onKeyDown: this.onKeyDown,
        canChangeMonth: false,
        firstDayOfWeek: 1,
        locale: 'pl'
      }}
    />;
  }
}
