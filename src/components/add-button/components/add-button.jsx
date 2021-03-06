import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Input } from 'semantic-ui-react';

class AddButton extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  static defaultProps = {
    disabled: false,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    adding: false,
    value: '',
  };

  onKeyDown = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.saveInput();
    }
    if (event.which === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.hideInput();
    }
  };

  updateValue = (_event, data) => this.setState({ value: data.value });
  showInput = () => this.setState({ adding: true });
  hideInput = () => this.setState({ value: '', adding: false });

  saveInput = () => {
    this.props.onSave(this.state.value);
    this.setState({ value: '' });
  };

  renderButton = () => {
    const { disabled, label, size } = this.props;

    return <Button fluid icon="plus" size={size} basic style={{ textAlign: 'left' }} content={label}
                   onClick={this.showInput} disabled={disabled} />;
  };

  renderInput = () => {
    const { label, size } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Input fluid action size={size} placeholder={label} value={value} onChange={this.updateValue}
               onKeyDown={this.onKeyDown} ref={(input) => this.field = input}>
          <input />
          <Button color="teal" icon="plus" content={this.translate('add-button.save', 'Dodaj')}
                  onClick={this.saveInput} />
          <Button color="red" icon="close" content={this.translate('add-button.cancel', 'Anuluj')}
                  onClick={this.hideInput} />
        </Input>
      </div>
    );
  };

  componentDidUpdate() {
    if (this.state.adding) {
      this.field.focus();
    } else {
      this.field = null;
    }
  }

  render() {
    const { adding } = this.state;
    return adding ? this.renderInput() : this.renderButton();
  }
}

export default injectIntl(AddButton);

