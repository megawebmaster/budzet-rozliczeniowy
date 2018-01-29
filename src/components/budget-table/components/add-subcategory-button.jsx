import React  from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { AddButton } from '../../add-button';

const AddSubcategoryButton = ({ intl, onSave }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return <AddButton size="tiny" label={translate('budget.table.add-subcategory', 'Dodaj podkategorię')}
                    onSave={onSave} />;
};

AddSubcategoryButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default injectIntl(AddSubcategoryButton);

