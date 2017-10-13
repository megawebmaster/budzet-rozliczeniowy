import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, GridRow, GridColumn, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import MonthList from '../../components/MonthList';
import './budget-layout.css';

const BudgetLayout = ({ children, year }) => (
  <Grid padded="horizontally">
    <GridRow>
      <GridColumn width={3}>
        <Menu>
          <Dropdown item fluid style={{textAlign: 'center', display: 'inline'}} text={year.toString()}>
            <DropdownMenu>
              <DropdownItem as={NavLink} to="/budget/2017" text="2017" />
              <DropdownItem as={NavLink} to="/budget/2016" text="2016" />
              <DropdownItem as={NavLink} to="/budget/2015" text="2015" />
            </DropdownMenu>
          </Dropdown>
        </Menu>
        <Menu vertical fluid>
          <MenuItem name="whole-year" as={NavLink} activeClassName="active" to={`/budget/${year}`} exact>Cały rok</MenuItem>
          <MenuItem name="irregular" as={NavLink} activeClassName="active" to={`/budget/${year}/irregular`}>Nieregularne</MenuItem>
          <MenuItem name="accounts" as={NavLink} activeClassName="active" to={`/budget/${year}/accounts`}>Stan kont</MenuItem>
        </Menu>
        <MonthList basePath={`/budget/${year}`} />
      </GridColumn>
      <GridColumn width={13}>
        {children}
      </GridColumn>
    </GridRow>
  </Grid>
);

export default BudgetLayout;

