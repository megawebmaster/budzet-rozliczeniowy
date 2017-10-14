import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Segment, Menu, MenuItem } from 'semantic-ui-react';

const Landing = () => (
  <div>
    <Menu tabular size="large" className="main-menu">
      <MenuItem header>Our Company</MenuItem>
      <Menu.Menu position="right">
        <MenuItem name="Log in" icon="lock" as={NavLink} to="/login" />
      </Menu.Menu>
    </Menu>
    <Segment padded="horizontal">
      Zaloguj się lub zarejestruj.
    </Segment>
  </div>
);

export default Landing;

