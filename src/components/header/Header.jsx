import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';
import './header.css';

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

const Header = ({ isLoggedIn }) => (
  <Menu tabular size="large" className="main-menu">
    <MenuItem header>Our Company</MenuItem>
    <MenuItem name="Budżet" as={NavLink} activeClassName="active" to="/budget" />
    <MenuItem name="Rozliczenia" as={NavLink} activeClassName="active" to="/about" />
    <Menu.Menu position="right">
      { !isLoggedIn && <MenuItem name="Log in" icon="power" as={NavLink} to="/login" /> }
      { isLoggedIn && <MenuItem name="Logout" icon="power" as={NavLink} to="/login" /> }
    </Menu.Menu>
  </Menu>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
