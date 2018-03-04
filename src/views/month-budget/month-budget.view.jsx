import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import { Budget, isLoading } from '../../components/budget';
import { month, year } from '../../components/location';
import './month-budget.css';

const MonthBudget = ({ month, year, loading, intl }) => {
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
      <Segment basic loading={loading} className="content-container">
        <Budget />
      </Segment>
    </Fragment>
  );
};

MonthBudget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(injectIntl(MonthBudget));

