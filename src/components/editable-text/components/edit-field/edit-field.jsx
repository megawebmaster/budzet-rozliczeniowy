import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';

export default class EditField extends PureComponent {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    inputRef: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    inputRef: (_ref) => {},
    placeholder: '',
    size: 'mini',
  };

  onKeyDown = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onSave();
    }
    if (!this.props.error && event.which === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onCancel();
    }
  };

  updateValue = (_event, data) => this.props.onChange(data.value);

  render() {
    const { error, inputRef, placeholder, size, value, onCancel, onSave, onFocus, onBlur } = this.props;

    return (
      <Input fluid action size={size} placeholder={placeholder} value={value} error={error} onChange={this.updateValue}
             onKeyDown={this.onKeyDown} onFocus={onFocus} onBlur={onBlur} ref={inputRef}>
        <input />
        <Button color="teal" icon="save" onClick={onSave} />
        <Button color="red" icon="close" onClick={onCancel} />
      </Input>
    );
  }
}
