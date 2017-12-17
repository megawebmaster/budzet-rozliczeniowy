import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import IncomeBudgetTable from '../../containers/budget/IncomeBudgetTable';
import ExpensesBudgetTable from '../../containers/budget/ExpensesBudgetTable';
import BudgetSummary from '../../containers/budget/BudgetSummary';
import AddCategoryButton from './AddCategoryButton';

import './budget.css';

class Budget extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { expensesCategories, onAddExpensesCategory } = this.props;

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
                             onAdd={onAddExpensesCategory}/>
        </Segment>
        <BudgetSummary className="segment yellow" />
      </div>
    );
  }
}

Budget.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
  onAddExpensesCategory: PropTypes.func.isRequired,
};

export default injectIntl(Budget);

