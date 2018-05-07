import React  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Segment } from 'semantic-ui-react';

import { Expenses } from '../../components/expenses';
import { ErrorMessage } from '../../components/error-message';
import './expenses.css';

const ExpensesView = ({ month, year, errors, loading, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const params = { month: translate(`month.${month}`, month), year };

  return (
    <div>
      <Helmet>
        <title>{format('views.expenses.title', 'Rozliczenie - {month} {year}', params)}</title>
      </Helmet>
      <Segment className="content-container-title">
        <h3>{format('views.expenses.header', 'Rozliczenie: {month} {year}', params)}</h3>
      </Segment>
      {errors.map(error => <ErrorMessage key={error} error={error} />)}
      <Segment basic loading={loading} className="content-container expenses">
        <Expenses />
      </Segment>
    </div>
  );
};

ExpensesView.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ExpensesView;
