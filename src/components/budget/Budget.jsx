import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Button } from 'semantic-ui-react';

import BudgetTable from './BudgetTable';
import BudgetSummary from './BudgetSummary';
import './budget.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
  incomeCategories: state.categories.income,
  expensesCategories: state.categories.expenses,
});

const mapDispatchToProps = (dispatch) => ({});

class Budget extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { incomeCategories, expensesCategories } = this.props;

    return (
      <div>
        <BudgetTable className="segment green" label="Przychody" categories={incomeCategories} />
        <Segment attached="top" color="yellow">
          <h3>Wydatki</h3>
        </Segment>
        <Segment attached>
          { expensesCategories.map(category =>
            <BudgetTable key={category.text} label={category.text} categories={category.children} />)}
          <Button icon="plus" size="large" content="Dodaj kategorię" fluid basic style={{ textAlign: 'left' }} />
        </Segment>
        <BudgetSummary className="segment yellow" />
      </div>
    );
  }
}

Budget.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Budget));

