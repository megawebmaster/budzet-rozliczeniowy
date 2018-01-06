import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import IncomeBudgetTable from '../../containers/budget/IncomeBudgetTable';
import ExpensesBudgetTable from '../../containers/budget/ExpensesBudgetTable';
import BudgetSummary from '../../containers/budget/BudgetSummary';
import AddCategoryButton from './AddCategoryButton';

import './budget.css';

const ENTER = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
// const ARROW_LEFT = 37;
// const ARROW_RIGHT = 39;

class Budget extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    categories: [],
    current: {
      index: -1,
      type: null,
    },
  };

  setCategories = (props) => {
    const incomeCategories = props.incomeCategories.map(category => category.id);
    const expensesCategories = [].concat(...props.expensesCategories.map(category =>
      category.children.map(subcategory => subcategory.id)
    ));
    this.setState({ categories: incomeCategories.concat(expensesCategories) });
  };

  inputMount = (type, category, input) => {
    input.inputRef.dataset.category = category.id;
    input.inputRef.dataset.type = type;
    this.inputs[type][category.id] = input.inputRef;
  };
  onKeyDown = (e) => {
    if ([ENTER, ARROW_UP, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
      if ([ENTER, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
        this.moveFocus(1);
      }
      if ([ARROW_UP].indexOf(e.keyCode) !== -1) {
        this.moveFocus(-1);
      }
    }
  };
  moveFocus = (delta) => {
    const { current, categories } = this.state;
    let next = current.index + delta;

    if (next < 0 || next >= Object.keys(this.inputs[current.type]).length) {
      return;
    }

    this.inputs[current.type][categories[next]].focus();
    this.setState({ current: { ...current, index: next }});
  };
  onFocus = (e) => {
    const { categories  } = this.state;
    const data = e.target.dataset;
    if (data.category) {
      const category = parseInt(data.category, 10);
      this.setState({ current: { index: categories.indexOf(category), type: data.type }});
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setCategories(nextProps);
  }

  componentWillMount() {
    this.inputs = {
      planned: {},
      real: {},
    };
    this.setCategories(this.props);
  }

  render() {
    const { expensesCategories, incomeCategories, onAddExpensesCategory } = this.props;
    // TODO: Add irregular summary

    return (
      <div onKeyDown={this.onKeyDown} onFocus={this.onFocus}>
        <IncomeBudgetTable className="segment green" label={this.translate('budget.income', 'Przychody')}
                           categories={incomeCategories} onInputMount={this.inputMount} />
        <Segment attached="top" color="yellow">
          <h3>{this.translate('budget.expenses', 'Wydatki')}</h3>
        </Segment>
        <Segment attached>
          { expensesCategories.map(category =>
            <ExpensesBudgetTable key={`category-${category.id}`} label={category.name} categoryId={category.id}
                                 onInputMount={this.inputMount} />)}
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
  incomeCategories: PropTypes.array.isRequired,
  onAddExpensesCategory: PropTypes.func.isRequired,
};

export default injectIntl(Budget);

