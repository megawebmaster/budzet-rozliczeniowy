import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import { Budget } from '../../components/budget';
import { ErrorMessage } from '../../components/error-message';
import './month-budget.css';

const MonthBudget = ({ month, year, loading, errors, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const params = { month: translate(`month.${month}`, month), year };

  return (
    <Fragment>
      <Helmet>
        <title>{format('views.month-budget.title', 'Budżet - {month} {year}', params)}</title>
      </Helmet>
      <Segment>
        <h3>{format('views.month-budget.header', 'Miesiąc budżetowy: {month} {year}', params)}</h3>
      </Segment>
      {errors.map(error => <ErrorMessage key={error} error={error} />)}
      <Segment basic loading={loading} className="content-container">
        <Budget />
      </Segment>
    </Fragment>
  );
};

MonthBudget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default injectIntl(MonthBudget);

