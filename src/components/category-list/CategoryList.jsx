import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'redux-first-router-link';
import { Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import './header.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const Header = ({ year }) => (
  <Menu tabular size="large" className="main-menu">
    <MenuItem header>Our Company</MenuItem>
    <MenuItem content="Budżet" name="budget" as={NavLink} activeClassName="active" to={`/${year}/budget`} />
    <MenuItem content="Rozliczenie" name="expenses" as={NavLink} activeClassName="active" to={`/${year}/expenses`} />
    <Menu.Menu position="right">
      <Dropdown item text={`Rok: ${year.toString()}`}>
        <DropdownMenu>
          <DropdownItem as={NavLink} to="/2017/budget" text="2017" />
          <DropdownItem as={NavLink} to="/2016/budget" text="2016" />
          <DropdownItem as={NavLink} to="/2015/budget" text="2015" />
        </DropdownMenu>
      </Dropdown>
      <MenuItem name="Logout" icon="power" as={NavLink} to="/" exact />
    </Menu.Menu>
  </Menu>
);

Header.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
