import React  from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Grid, GridRow, GridColumn, Menu, MenuItem } from 'semantic-ui-react';

import Header from '../../components/header/Header';
import MonthList from '../../components/MonthList';
import './budget-layout.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
});

const BudgetLayout = ({ children, year }) => (
  <div>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridRow>
        <GridColumn width={3}>
          <Menu vertical fluid>
            <MenuItem name="whole-year" as={NavLink} activeClassName="active"
                      to={{ type: 'BUDGET_SUMMARY', payload: {year}}}>
              Cały rok
            </MenuItem>
            <MenuItem name="irregular" as={NavLink} activeClassName="active"
                      to={{ type: 'BUDGET_IRREGULAR', payload: {year}}}>
              Nieregularne
            </MenuItem>
            <MenuItem name="accounts" as={NavLink} activeClassName="active"
                      to={{ type: 'BUDGET_ACCOUNTS', payload: {year}}}>
              Stan kont
            </MenuItem>
          </Menu>
          <MonthList baseRoute={{ type: 'BUDGET', payload: { year } }} />
        </GridColumn>
        <GridColumn width={13}>
          {children}
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(BudgetLayout);

