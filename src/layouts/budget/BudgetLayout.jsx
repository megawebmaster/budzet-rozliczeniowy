import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Grid, GridColumn, Menu, MenuItem } from 'semantic-ui-react';

import { Header } from '../../components/header';
import { MonthList } from '../../components/month-list';
import { ROUTE_BUDGET_ACCOUNTS, ROUTE_BUDGET_IRREGULAR, ROUTE_BUDGET_MONTH, ROUTE_BUDGET_SUMMARY } from '../../routes';
import { year } from '../../components/location';
import './budget-layout.css';

const mapStateToProps = (state) => ({
  year: year(state),
});

const BudgetLayout = ({ children, year }) => (
  <Fragment>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridColumn width={3} className="menu-column">
        <Menu vertical fluid>
          <MenuItem name="whole-year" as={NavLink} activeClassName="active"
                    to={{ type: ROUTE_BUDGET_SUMMARY, payload: {year}}}>
            Cały rok
          </MenuItem>
          <MenuItem name="irregular" as={NavLink} activeClassName="active"
                    to={{ type: ROUTE_BUDGET_IRREGULAR, payload: {year}}}>
            Nieregularne
          </MenuItem>
          <MenuItem name="accounts" as={NavLink} activeClassName="active"
                    to={{ type: ROUTE_BUDGET_ACCOUNTS, payload: {year}}}>
            Stan kont
          </MenuItem>
        </Menu>
        <MonthList baseRoute={{ type: ROUTE_BUDGET_MONTH, payload: { year } }} />
      </GridColumn>
      <GridColumn width={13}>
        {children}
      </GridColumn>
    </Grid>
  </Fragment>
);

export default connect(mapStateToProps)(BudgetLayout);

