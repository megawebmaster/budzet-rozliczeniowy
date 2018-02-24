import React  from 'react';
import { connect } from 'react-redux';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { Header } from '../../components/header';
import { MonthList } from '../../components/month-list';
import { ROUTE_EXPENSES_MONTH } from '../../routes';
import { year } from '../../components/location';

const mapStateToProps = (state) => ({
  year: year(state),
});

const ExpensesLayout = ({ children, year }) => (
  <div>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridRow>
        <GridColumn width={3}>
          <MonthList baseRoute={{ type: ROUTE_EXPENSES_MONTH, payload: { year } }} />
        </GridColumn>
        <GridColumn width={13}>
          {children}
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(ExpensesLayout);

