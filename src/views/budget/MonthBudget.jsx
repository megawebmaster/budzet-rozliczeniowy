import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import Budget from '../../containers/budget/Budget';
import './month-budget.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
});

class MonthBudget extends Component {

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { month, year } = this.props;

    return (
      <div>
        <Helmet>
          <title>Budżet - {this.format(`month.${month}`, month)} {`${year}`}</title>
        </Helmet>
        <Segment>
          <h3>
            Miesiąc budżetowy: {this.format(`month.${month}`, month)} {year}
          </h3>
        </Segment>
        <Budget />
      </div>
    );
  }
}

MonthBudget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(injectIntl(MonthBudget));

