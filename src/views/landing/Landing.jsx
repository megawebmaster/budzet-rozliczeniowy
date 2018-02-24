import React  from 'react';
import Link from 'redux-first-router-link';
import { Segment, Menu, MenuItem } from 'semantic-ui-react';
import { ROUTE_LOGIN } from '../../routes';

const Landing = () => (
  <div>
    <Menu tabular size="large" className="main-menu">
      <MenuItem header>Our Company</MenuItem>
      <Menu.Menu position="right">
        <MenuItem name="Log in" icon="lock" as={Link} to={{ type: ROUTE_LOGIN }} />
      </Menu.Menu>
    </Menu>
    <Segment padded={true}>
      Zaloguj się lub zarejestruj.
    </Segment>
  </div>
);

export default Landing;

