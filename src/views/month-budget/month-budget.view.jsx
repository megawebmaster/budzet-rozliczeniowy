import React  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import { Budget } from '../../components/budget';
import './month-budget.css';
import { month, year } from '../../components/location';


const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
});

const MonthBudget = ({ month, year, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const params = { month: translate(`month.${month}`, month), year };

  return (
    <div>
      <Helmet>
        <title>{format('views.month-budget.title', 'Budżet - {month} {year}', params)}</title>
      </Helmet>
      <Segment>
        <h3>{format('views.month-budget.header', 'Miesiąc budżetowy: {month} {year}', params)}</h3>
      </Segment>
      <Budget />
    </div>
  );
};

MonthBudget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(injectIntl(MonthBudget));

