import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownSearchInput, Input } from 'semantic-ui-react';

export default class CategoryField extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool.isRequired,
    value: PropTypes.any.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
  };
  static defaultProps = {
    disabled: false,
    onInputMount: (_type, _input) => {},
  };

  state = {
    upward: false,
    open: false,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  onOpen = () => {
    let element = this.dropdown;
    let top = 0;
    while(element) {
      top += element.offsetTop;
      element = element.offsetParent;
    }
    this.setState({ upward: top > document.body.clientHeight - 260, open: true });
    this.props.onFocus();
    this.dropdown.focus();
  };
  onClose = () => {
    this.setState({ open: false });
    this.props.onBlur();
  };
  onChange = (_event, data) => this.props.onChange(data.value);

  renderInput = () => <DropdownSearchInput inputRef={this.mountDropdown} onKeyDown={this.hideOnKeyDown} />;
  hideOnKeyDown = (event) => event.stopPropagation();
  mountDropdown = (ref) => {
    this.dropdown = ref;
    this.mountInput(this.props, ref);
  };

  mountInput = (props, input) => {
    const { onInputMount, disabled } = props;

    if (!disabled && input) {
      onInputMount({ inputRef: input });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.mountInput(nextProps, this.dropdown);
  }

  render() {
    const { categories, disabled, error, value } = this.props;
    const { upward } = this.state;

    if (value && categories.some(c => c.text === '!ENCRYPTED!')) {
      return <Input fluid disabled />;
    }

    return (
      <Dropdown fluid selection search className="category-field" value={value} options={categories} upward={upward}
                openOnFocus={false} placeholder={this.translate('expenses-row.category', 'Wybierz kategorię')}
                error={error} disabled={disabled} onChange={this.onChange} onOpen={this.onOpen} onClose={this.onClose}
                searchInput={this.renderInput()}
      />
    );
  }
}

