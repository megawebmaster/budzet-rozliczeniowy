import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Dropdown, DropdownSearchInput } from 'semantic-ui-react';

class CategoryField extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { value, categories, onInputMount, onUpdate } = this.props;

    return (
      <Dropdown fluid value={value} selection search options={categories} onChange={onUpdate} upward
                openOnFocus={false} placeholder={this.translate('expenses-row.category', 'Wybierz kategorię')}
                searchInput={<DropdownSearchInput inputRef={(i) => onInputMount({ inputRef: i })} />}
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

