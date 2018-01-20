import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Segment } from 'semantic-ui-react';

import NavigableTable from '../../components/NavigableTable';
import IrregularBudgetTable from '../../containers/irregular_budget/IrregularBudgetTable';

const mapStateToProps = (state) => ({
  categories: state.categories.irregular,
  year: state.location.payload.year,
});

const mapDispatchToProps = (dispatch) => ({});

class IrregularBudget extends Component {
  format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

  render() {
    const { categories, year, onFocus, onInputMount, onKeyDown } = this.props;

    return (
      <div onKeyDown={onKeyDown} onFocus={onFocus}>
        <Helmet>
          <title>Budżet - wydatki nieregularne</title>
        </Helmet>
        <Segment>
          <h3>
            Wydatki nieregularne: {year} rok
          </h3>
        </Segment>
        <IrregularBudgetTable className="segment blue" label="Roczne wydatki nieregularne" categories={categories}
                              onInputMount={onInputMount} />
      </div>
    );
  }
}

const NavigableIrregularBudget = NavigableTable(IrregularBudget, (props) => props.categories.map(category => category.id));
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NavigableIrregularBudget));

