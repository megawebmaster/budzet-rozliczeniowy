import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import IncomeBudgetTable from '../../containers/budget/IncomeBudgetTable';
import ExpensesBudgetTable from '../../containers/budget/ExpensesBudgetTable';
import BudgetSummary from '../../containers/budget/BudgetSummary';
import './budget.css';
import AddCategoryButton from './AddCategoryButton';

class Budget extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { expensesCategories } = this.props;

    return (
      <div>
        <IncomeBudgetTable className="segment green" label={this.translate('budget.income', 'Przychody')} />
        <Segment attached="top" color="yellow">
          <h3>{this.translate('budget.expenses', 'Wydatki')}</h3>
        </Segment>
        <Segment attached>
          { expensesCategories.map(category =>
            <ExpensesBudgetTable key={`category-${category.id}`} label={category.name} categoryId={category.id} />)}
          <AddCategoryButton label={this.translate('budget.table.add-category', 'Dodaj kategorię')} size="large"
                             onAdd={(category) => console.log('adding category:', category)}/>
        </Segment>
        <BudgetSummary className="segment yellow" />
      </div>
    );
  }
}

Budget.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
};

export default injectIntl(Budget);

