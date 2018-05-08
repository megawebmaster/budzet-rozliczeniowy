import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import { BudgetSummary } from '../../budget-summary';
import { IncomeBudgetTable } from '../../income-budget-table';
import { ExpensesBudgetTable } from '../../expenses-budget-table';
import { IrregularBudgetTable } from '../../irregular-budget-table';
import NavigableTable from '../../NavigableTable';

import AddCategoryButton from './add-category-button.container';
import './budget.css';

class Budget extends Component {
  static propTypes = {
    expensesCategories: PropTypes.array.isRequired,
    incomeCategories: PropTypes.array.isRequired,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { expensesCategories, incomeCategories, onKeyDown, onFocus, onInputMount } = this.props;

    return (
      <div onKeyDown={onKeyDown} onFocus={onFocus}>
        <IncomeBudgetTable className="segment green" label={this.translate('budget.income', 'Przychody')}
                           categories={incomeCategories} onInputMount={onInputMount} />
        <Segment attached="top" color="yellow">
          <h3>{this.translate('budget.expenses', 'Wydatki')}</h3>
        </Segment>
        <Segment attached>
          { expensesCategories.map(category =>
            <ExpensesBudgetTable key={`category-${category.id}`} label={category.name} category={category}
                                 onInputMount={onInputMount} />)}
          <AddCategoryButton />
        </Segment>
        <IrregularBudgetTable className="segment blue" label="Nieregularne wydatki" />
        <BudgetSummary className="segment teal" />
      </div>
    );
  }
}

const NavigableBudget = NavigableTable(Budget, {
  getItems: (props) => {
    const incomeCategories = props.incomeCategories.map(category => category.id);
    const expensesCategories = [].concat(...props.expensesCategories.map(category =>
      category.children.map(subcategory => subcategory.id)
    ));
    return incomeCategories.concat(expensesCategories);
  },
  bottomMargin: 130
});

export default injectIntl(NavigableBudget);
