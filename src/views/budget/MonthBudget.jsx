import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Tab, TabPane } from 'semantic-ui-react';

import Budget from '../../components/budget/Budget';
import './month-budget.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
});

const mapDispatchToProps = (dispatch) => ({});

class MonthBudget extends Component {
  // renderSummaryPane() {
  //   return (
  //     <TabPane>Tutaj będzie podsumowanie</TabPane>
  //   );
  // }
  //
  // renderBudgetPane() {
  //   return (
  //     <TabPane>Tutaj będzie budżet</TabPane>
  //   );
  // }

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    // const panes = [
    //   { menuItem: 'Podsumowanie', render: this.renderSummaryPane },
    //   { menuItem: 'Budżet', render: this.renderBudgetPane },
    // ];
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
        {/*<Tab panes={panes} menu={{ attached: true, tabular: true, className: 'two item' }} />*/}
      </div>
    );
  }
}

MonthBudget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MonthBudget));

