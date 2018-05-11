import React  from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { AddButton } from '../../add-button';

const AddSubcategoryButton = ({ intl, disabled, onSave }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return <AddButton size="tiny" label={translate('budget.table.add-subcategory', 'Dodaj podkategorię')}
                    onSave={onSave} disabled={disabled} />;
};

AddSubcategoryButton.propTypes = {
  disabled: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};
AddSubcategoryButton.defaultProps = {
  disabled: false,
};

export default injectIntl(AddSubcategoryButton);

