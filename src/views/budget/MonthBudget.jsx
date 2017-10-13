import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Message, MessageHeader, Tab, TabPane } from 'semantic-ui-react';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

class MonthBudget extends Component {
  renderSummaryPane() {
    return (
      <TabPane>Tutaj będzie podsumowanie</TabPane>
    );
  }

  renderBudgetPane() {
    return (
      <TabPane>Tutaj będzie budżet</TabPane>
    );
  }

  format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

  render() {
    const panes = [
      {menuItem: 'Podsumowanie', render: this.renderSummaryPane},
      {menuItem: 'Budżet', render: this.renderBudgetPane},
    ];
    const {match: {params}} = this.props;
    const { month, year } = params;

    return (
      <div>
        <Helmet>
          <title>Budżet - {this.format(`month.${month}`, month)} {year}</title>
        </Helmet>
        <Message>
          <MessageHeader>
            Miesiąc budżetowy: {this.format(`month.${month}`, month)} {year}
          </MessageHeader>
        </Message>
        <Tab panes={panes} menu={{ attached: true, tabular: true, className: 'two item' }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MonthBudget));

