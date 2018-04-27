import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { NavLink } from 'redux-first-router-link';
import { Button, Icon, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';

import { ROUTE_BUDGET, ROUTE_EXPENSES_MONTH } from '../../../routes';
import './header.css';

const Header = ({ budgets, budget, budgetSlug, years, year, month, page, onLogout, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const payload = { budget: budgetSlug, year, month: month || (new Date()).getMonth() + 1 };

  return (
    <Menu tabular size="large" className="main-menu">
      <MenuItem header>SimplyBudget</MenuItem>
      <Dropdown item loading={!budget.name} text={format('header.budget', 'Budżet {value}', {value: budget.name})}>
        <DropdownMenu>
          {budgets.map(b =>
            <DropdownItem key={`budget-${b.id}`} text={b.name} as={NavLink}
                          to={{ type: page, payload: { budget: b.slug, year, month } }} />
          )}
        </DropdownMenu>
      </Dropdown>
      <MenuItem name="budget" as={NavLink} activeClassName="active" to={{ type: ROUTE_BUDGET, payload }}>
        {translate('header.menu.budget', 'Budżet')}
      </MenuItem>
      <MenuItem name="expenses" as={NavLink} activeClassName="active" to={{ type: ROUTE_EXPENSES_MONTH, payload }}>
        {translate('header.menu.expenses', 'Wydatki')}
      </MenuItem>
      <Menu.Menu position="right">
        <Dropdown item loading={!years} text={format('header.year', 'Rok: {value}', {value: year.toString()})}>
          <DropdownMenu>
            {years.map(y =>
              <DropdownItem key={`year-${y}`} text={y} as={NavLink}
                            to={{ type: page, payload: { budget: budgetSlug, year: y, month: 1 } }} />
            )}
          </DropdownMenu>
        </Dropdown>
        <MenuItem name="logout" as={Button} onClick={onLogout}>
          <Icon name="power" />
          {translate('header.logout', 'Wyloguj się')}
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

const budgetShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

Header.propTypes = {
  month: PropTypes.number,
  page: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  budget: budgetShape,
  budgetSlug: PropTypes.string.isRequired,
  budgets: PropTypes.arrayOf(budgetShape).isRequired,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  budget: {
    id: 0,
    name: '',
    slug: '',
  },
};

export default injectIntl(Header);
