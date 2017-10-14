import React  from 'react';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import Header from '../../components/header/Header';
import MonthList from '../../components/MonthList';

const SpendingLayout = ({ children, year }) => (
  <div>
    <Header year={year} />
    <Grid padded="horizontally">
      <GridRow>
        <GridColumn width={3}>
          <MonthList basePath={`/${year}/spending`} />
        </GridColumn>
        <GridColumn width={13}>
          {children}
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default SpendingLayout;

