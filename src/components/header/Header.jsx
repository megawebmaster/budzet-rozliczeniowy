import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import './header.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
  page: state.location.type,
});

const mapDispatchToProps = (dispatch) => ({});

const Header = ({ year, month, page }) => {
  const payload = { year, month };

  return (
    <Menu tabular size="large" className="main-menu">
      <MenuItem header>Our Company</MenuItem>
      <MenuItem name="budget" as={NavLink} activeClassName="active" to={{ type: 'BUDGET', payload }}>
        Budżet
      </MenuItem>
      <MenuItem name="expenses" as={NavLink} activeClassName="active" to={{ type: 'EXPENSES', payload }}>
        Rozliczenie
      </MenuItem>
      <Menu.Menu position="right">
        <Dropdown item text={`Rok: ${year.toString()}`}>
          <DropdownMenu>
            <DropdownItem as={NavLink} to={{ type: page, payload: { year: 2017, month: 1 } }} text="2017" />
            <DropdownItem as={NavLink} to={{ type: page, payload: { year: 2016, month: 1 } }} text="2016" />
            <DropdownItem as={NavLink} to={{ type: page, payload: { year: 2015, month: 1 } }} text="2015" />
          </DropdownMenu>
        </Dropdown>
        <MenuItem name="Logout" icon="power" as={NavLink} to="/" exact />
      </Menu.Menu>
    </Menu>
  );
};

Header.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
