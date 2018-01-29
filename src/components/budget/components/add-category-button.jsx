import React  from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { AddButton } from '../../add-button';

const AddCategoryButton = ({ intl, onSave }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return <AddButton size="large" label={translate('budget.table.add-category', 'Dodaj kategorię')} onSave={onSave} />;
};

AddCategoryButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default injectIntl(AddCategoryButton);

