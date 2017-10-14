import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, GridRow, GridColumn, Menu, MenuItem } from 'semantic-ui-react';
import Header from '../../components/header/Header';
import MonthList from '../../components/MonthList';
import './budget-layout.css';

const BudgetLayout = ({ children, year }) => (
  <div>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridRow>
        <GridColumn width={3}>
          <Menu vertical fluid>
            <MenuItem name="whole-year" as={NavLink} activeClassName="active" to={`/${year}/budget/summary`}>Cały rok</MenuItem>
            <MenuItem name="irregular" as={NavLink} activeClassName="active" to={`/${year}/budget/irregular`}>Nieregularne</MenuItem>
            <MenuItem name="accounts" as={NavLink} activeClassName="active" to={`/${year}/budget/accounts`}>Stan kont</MenuItem>
          </Menu>
          <MonthList basePath={`/${year}/budget`} />
        </GridColumn>
        <GridColumn width={13}>
          {children}
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default BudgetLayout;

