import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import Link from 'redux-first-router-link';
import { Icon, Segment, Menu, MenuItem } from 'semantic-ui-react';
import { ROUTE_LOGIN } from '../../routes';

import './landing.css';

const Landing = ({ intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return (
    <Fragment>
      <Menu tabular size="large" className="main-menu" attached="top">
        <MenuItem header>SimplyBudget.it</MenuItem>
        <Menu.Menu position="right">
          <MenuItem as={Link} to={{ type: ROUTE_LOGIN }}>
            <Icon name="lock" />
            {translate('views.landing.login', 'Zaloguj się')}
          </MenuItem>
        </Menu.Menu>
      </Menu>
      <Segment basic attached="bottom" textAlign="center">
        <Link to={{ type: ROUTE_LOGIN }}>Zaloguj się</Link>
      </Segment>
    </Fragment>
  );
};

export default injectIntl(Landing);

