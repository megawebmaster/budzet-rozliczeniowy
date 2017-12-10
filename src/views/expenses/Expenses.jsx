import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import ExpensesGrid from '../../components/expenses-grid/ExpensesGrid';
import './expenses.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
});

class Expenses extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { month, year } = this.props;

    return (
      <div>
        <Helmet>
          <title>Rozliczenie - {this.format(`month.${month}`, month)} {`${year}`}</title>
        </Helmet>
        <Segment>
          <h3>
            Rozliczenie: {this.format(`month.${month}`, month)} {year}
          </h3>
        </Segment>
        <ExpensesGrid />
      </div>
    );
  }
}

Expenses.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(injectIntl(Expenses));

