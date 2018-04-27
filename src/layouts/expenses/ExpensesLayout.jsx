import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';

import { Header } from '../../components/header';
import { MonthList } from '../../components/month-list';
import { ROUTE_EXPENSES_MONTH } from '../../routes';
import { budget, year } from '../../components/location';
import './expenses-layout.css';

const mapStateToProps = (state) => ({
  year: year(state),
  budget: budget(state),
});

const ExpensesLayout = ({ children, budget, year }) => (
  <Fragment>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridColumn width={3} className="menu-column">
        <MonthList baseRoute={{ type: ROUTE_EXPENSES_MONTH, payload: { budget, year } }} />
      </GridColumn>
      <GridColumn width={13}>
        {children}
      </GridColumn>
    </Grid>
  </Fragment>
);

export default connect(mapStateToProps)(ExpensesLayout);

