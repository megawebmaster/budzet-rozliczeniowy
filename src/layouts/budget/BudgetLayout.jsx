import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, GridRow, GridColumn, Menu, MenuItem } from 'semantic-ui-react';
import MonthList from '../../components/MonthList';
import './budget-layout.css';

const BudgetLayout = ({ children }) => (
  <Grid padded="horizontally">
    <GridRow>
      <GridColumn width={3}>
        <Menu vertical fluid>
          <MenuItem name="whole-year" as={NavLink} activeClassName="active" to="/budget/year">Cały rok</MenuItem>
          <MenuItem name="irregular" as={NavLink} activeClassName="active" to="/budget/irregular">Nieregularne</MenuItem>
          <MenuItem name="accounts" as={NavLink} activeClassName="active" to="/budget/accounts">Stan kont</MenuItem>
        </Menu>
        <MonthList basePath="/budget/month" />
      </GridColumn>
      <GridColumn width={13}>
        {children}
      </GridColumn>
    </GridRow>
  </Grid>
);

export default BudgetLayout;

