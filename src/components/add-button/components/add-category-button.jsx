import React  from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import AddButton from './add-button';

const AddCategoryButton = ({ disabled, intl, onSave, size }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return <AddButton
    disabled={disabled}
    label={translate('budget.table.add-category', 'Dodaj kategorię')}
    onSave={onSave}
    size={size}
  />;
};

AddCategoryButton.propTypes = {
  disabled: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  size: PropTypes.string,
};
AddCategoryButton.defaultProps = {
  disabled: false,
  size: 'large',
};

export default injectIntl(AddCategoryButton);

