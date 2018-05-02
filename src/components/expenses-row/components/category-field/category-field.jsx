import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Dropdown, DropdownSearchInput } from 'semantic-ui-react';

class CategoryField extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    upward: false
  };

  onOpen = () => {
    let element = this.dropdown;
    let top = 0;
    while(element) {
      top += element.offsetTop;
      element = element.offsetParent;
    }
    this.setState({ upward: top > document.body.clientHeight - 260});
    this.dropdown.focus();
  };

  mountDropdown = (ref) => {
    this.dropdown = ref;
    this.props.onInputMount({ inputRef: ref });
  };

  render() {
    const { value, categories, onUpdate } = this.props;
    const { upward } = this.state;

    return (
      <Dropdown fluid value={value} selection search options={categories} onChange={onUpdate} upward={upward}
                onOpen={this.onOpen} openOnFocus={false} className="category-field"
                placeholder={this.translate('expenses-row.category', 'Wybierz kategorię')}
                searchInput={<DropdownSearchInput inputRef={this.mountDropdown} />}
      />
    );
  }
}

CategoryField.defaultProps = {
  onInputMount: (_type, _input) => {},
};
CategoryField.propTypes = {
  categories: PropTypes.array.isRequired,
  onInputMount: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default  injectIntl(CategoryField);

