import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Grid, GridColumn, Menu, MenuItem } from 'semantic-ui-react';

import { Header } from '../../components/header';
import { MonthList } from '../../components/month-list';
import { PasswordRequirement } from '../../components/password-requirement';
import { ROUTE_BUDGET_IRREGULAR, ROUTE_BUDGET_MONTH } from '../../routes';
import { budget, year } from '../../components/location';
import './budget-layout.css';

const mapStateToProps = (state) => ({
  year: year(state),
  budget: budget(state),
});

const BudgetLayout = ({ children, year, budget }) => (
  <Fragment>
    <Header />
    <PasswordRequirement>
      <Grid padded="horizontally" className="content">
        <GridColumn width={3} className="menu-column">
          <Menu vertical fluid>
            <MenuItem name="irregular" as={NavLink} activeClassName="active"
                      to={{ type: ROUTE_BUDGET_IRREGULAR, payload: { budget, year } }}>
              Nieregularne
            </MenuItem>
          </Menu>
          <MonthList baseRoute={{ type: ROUTE_BUDGET_MONTH, payload: { budget, year } }} />
        </GridColumn>
        <GridColumn width={13} style={{paddingBottom: 0}}>
          {children}
        </GridColumn>
      </Grid>
    </PasswordRequirement>
  </Fragment>
);

export default connect(mapStateToProps)(BudgetLayout);

