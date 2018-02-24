import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { NavLink } from 'redux-first-router-link';
import { Icon, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';

import './header.css';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../../routes';

const Header = ({ years, year, month, page, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);
  const payload = { year, month: month || (new Date()).getMonth() + 1 };

  return (
    <Menu tabular size="large" className="main-menu">
      <MenuItem header>SimplyBudget</MenuItem>
      <MenuItem name="budget" as={NavLink} activeClassName="active" to={{ type: ROUTE_BUDGET_MONTH, payload }}>
        {translate('header.menu.budget', 'Budżet')}
      </MenuItem>
      <MenuItem name="expenses" as={NavLink} activeClassName="active" to={{ type: ROUTE_EXPENSES_MONTH, payload }}>
        {translate('header.menu.expenses', 'Rozliczenie')}
      </MenuItem>
      <Menu.Menu position="right">
        <Dropdown item text={format('header.year', 'Rok: {value}', {value: year.toString()})}>
          <DropdownMenu>
            {years.map(y =>
              <DropdownItem key={`year-${y}`} as={NavLink} to={{ type: page, payload: { year: y, month: 1 } }} text={y} />)
            }
          </DropdownMenu>
        </Dropdown>
        <MenuItem name="logout" as={NavLink} to="/" exact>
          <Icon name="power" />
          {translate('header.logout', 'Wyloguj się')}
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

Header.propTypes = {
  month: PropTypes.number,
  page: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
};

export default injectIntl(Header);
