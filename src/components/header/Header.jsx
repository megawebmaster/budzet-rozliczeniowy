import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import './header.css';

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

const Header = ({ isLoggedIn, year }) => (
  <Menu tabular size="large" className="main-menu">
    <MenuItem header>Our Company</MenuItem>
    <MenuItem content="Budżet" name="budget" as={NavLink} activeClassName="active" to={`/${year}/budget`} />
    <MenuItem content="Rozliczenie" name="spendings" as={NavLink} activeClassName="active" to={`/${year}/spendings`} />
    <Menu.Menu position="right">
      <Dropdown item text={`Rok: ${year.toString()}`}>
        <DropdownMenu>
          <DropdownItem as={NavLink} to="/2017" text="2017" />
          <DropdownItem as={NavLink} to="/2016" text="2016" />
          <DropdownItem as={NavLink} to="/2015" text="2015" />
        </DropdownMenu>
      </Dropdown>
      { !isLoggedIn && <MenuItem name="Log in" icon="power" as={NavLink} to="/login" /> }
      { isLoggedIn && <MenuItem name="Logout" icon="power" as={NavLink} to="/login" /> }
    </Menu.Menu>
  </Menu>
);

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
