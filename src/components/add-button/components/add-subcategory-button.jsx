import React  from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import AddButton from './add-button';

const AddSubcategoryButton = ({ disabled, intl, onSave, size }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return <AddButton
    disabled={disabled}
    label={translate('budget.table.add-subcategory', 'Dodaj podkategorię')}
    onSave={onSave}
    size={size}
  />;
};

AddSubcategoryButton.propTypes = {
  disabled: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  size: PropTypes.string,
};
AddSubcategoryButton.defaultProps = {
  disabled: false,
  size: 'tiny',
};

export default injectIntl(AddSubcategoryButton);

