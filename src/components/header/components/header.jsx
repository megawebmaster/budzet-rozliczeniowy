import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'redux-first-router-link';
import {
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  Icon,
  Menu,
  MenuItem
} from 'semantic-ui-react';

import { ROUTE_BUDGET, ROUTE_EXPENSES_MONTH } from '../../../routes';
import { ScrollUp } from '../../scroll-up';
import { RenameBudget } from './rename-budget';

import './header.css';

const budgetShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

export default class Header extends PureComponent {
  static propTypes = {
    month: PropTypes.number,
    page: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    years: PropTypes.array.isRequired,
    budget: budgetShape,
    budgetSlug: PropTypes.string.isRequired,
    budgets: PropTypes.arrayOf(budgetShape).isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    budget: {
      id: 0,
      name: '',
      slug: '',
    },
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  saveRef = (ref) => this.ref = ref;

  render() {
    const { budgets, budget, budgetSlug, years, year, month, page, onLogout } = this.props;
    const payload = { budget: budgetSlug, year, month: month || (new Date()).getMonth() + 1 };

    return (
      <div ref={this.saveRef}>
        <Menu tabular fixed="top" size="large" className="main-menu">
          <MenuItem header>SimplyBudget</MenuItem>
          <MenuItem name="budget" as={NavLink} activeClassName="active" to={{ type: ROUTE_BUDGET, payload }}>
            {this.translate('header.menu.budget', 'Budżet')}
          </MenuItem>
          <MenuItem name="expenses" as={NavLink} activeClassName="active" to={{ type: ROUTE_EXPENSES_MONTH, payload }}>
            {this.translate('header.menu.expenses', 'Wydatki')}
          </MenuItem>
          <Menu.Menu position="right">
            <Dropdown
              item
              loading={!years}
              text={this.format('header.year', 'Rok: {value}', { value: year.toString() })}
            >
              <DropdownMenu>
                {years.map(y =>
                  <DropdownItem
                    key={`year-${y}`}
                    text={y}
                    as={NavLink}
                    to={{ type: page, payload: { budget: budgetSlug, year: y, month: 1 } }}
                  />
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              item
              loading={!budget.name}
              text={this.format('header.budget', 'Budżet: {value}', { value: budget.name })}
            >
              <DropdownMenu>
                <DropdownHeader>{this.format('header.budgets', 'Twoje budżety')}</DropdownHeader>
                {budgets.map(b =>
                  <DropdownItem
                    key={`budget-${b.id}`}
                    text={b.name}
                    as={Link}
                    to={{ type: page, payload: { budget: b.slug, year, month } }}
                  />
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown item icon="settings" className="settings">
              <DropdownMenu>
                <DropdownHeader>{this.format('header.budget-settings.header', 'Ustawienia budżetu')}</DropdownHeader>
                <RenameBudget />
              </DropdownMenu>
            </Dropdown>
            <MenuItem name="logout" as={Button} onClick={onLogout}>
              <Icon name="power" />
              {this.translate('header.logout', 'Wyloguj się')}
            </MenuItem>
          </Menu.Menu>
        </Menu>
        {this.ref && <ScrollUp anchor={this.ref} />}
      </div>
    );
  };
}
