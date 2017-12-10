import React  from 'react';
import { connect } from 'react-redux';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import Header from '../../components/header/Header';
import MonthList from '../../components/MonthList';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
});

const ExpensesLayout = ({ children, year }) => (
  <div>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridRow>
        <GridColumn width={3}>
          <MonthList baseRoute={{ type: 'EXPENSES', payload: { year } }} />
        </GridColumn>
        <GridColumn width={13}>
          {children}
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(ExpensesLayout);

