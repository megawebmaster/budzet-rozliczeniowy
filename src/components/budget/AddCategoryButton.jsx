import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Input } from 'semantic-ui-react';

class AddCategoryButton extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    adding: false,
    category: '',
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

  updateValue = (_event, data) => {
    this.setState({ category: data.value });
  };

  showInput = () => {
    this.setState({ adding: true });
  };

  hideInput = () => {
    this.setState({ category: '', adding: false });
  };

  saveInput = () => {
    this.props.onAdd(this.state.category);
    this.hideInput();
  };

  renderButton = () => {
    const { label, size } = this.props;

    return <Button fluid icon="plus" size={size} basic style={{ textAlign: 'left' }} content={label}
                   onClick={this.showInput} />;
  };

  renderInput = () => {
    const { label, size } = this.props;
    const { category } = this.state;

    return (
      <div>
        <Input fluid action size={size} placeholder={label} value={category} onChange={this.updateValue}
               onKeyDown={this.onKeyDown} ref={(input) => this.field = input}>
          <input />
          <Button color="teal" icon="plus" content={this.translate('add-category-button.save', 'Dodaj')}
                  onClick={this.saveInput} />
          <Button color="red" icon="close" content={this.translate('add-category-button.cancel', 'Anuluj')}
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

AddCategoryButton.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default injectIntl(AddCategoryButton);

