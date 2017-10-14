import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Button, Segment, SegmentGroup, Tab, TabPane } from 'semantic-ui-react';
import './month-budget.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

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

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const panes = [
      { menuItem: 'Podsumowanie', render: this.renderSummaryPane },
      { menuItem: 'Budżet', render: this.renderBudgetPane },
    ];
    const { match: { params } } = this.props;
    const { month, year } = params;

    return (
      <div>
        <Helmet>
          <title>Budżet - {this.format(`month.${month}`, month)} {year}</title>
        </Helmet>
        <SegmentGroup horizontal>
          <Segment>
            <h3>
              Miesiąc budżetowy: {this.format(`month.${month}`, month)} {year}
            </h3>
          </Segment>
          <Button as={NavLink} to={`/${year}/spending/${month}`} size="big" attached="right" className="spending"
                  content="Rozliczenie" labelPosition="right" icon="arrow right" />
        </SegmentGroup>
        <Tab panes={panes} menu={{ attached: true, tabular: true, className: 'two item' }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MonthBudget));

