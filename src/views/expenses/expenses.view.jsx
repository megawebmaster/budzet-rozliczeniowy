import React  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import { Expenses, isLoading } from '../../components/expenses';
import './expenses.css';
import { month, year } from '../../components/location';

const ExpensesView = ({ month, year, loading, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const params = { month: translate(`month.${month}`, month), year };

  return (
    <div>
      <Helmet>
        <title>{format('views.expenses.title', 'Rozliczenie - {month} {year}', params)}</title>
      </Helmet>
      <Segment>
        <h3>{format('views.expenses.header', 'Rozliczenie: {month} {year}', params)}</h3>
      </Segment>
      <Segment basic loading={loading}>
        <Expenses />
      </Segment>
    </div>
  );
};

ExpensesView.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(injectIntl(ExpensesView));

