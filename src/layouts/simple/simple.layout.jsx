import React, { Fragment } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';

import { Header } from '../../components/header';
import './simple-layout.css';

const SimpleLayout = ({ children }) => (
  <Fragment>
    <Header />
    <Grid padded="horizontally" className="content">
      <GridColumn width={16} style={{ paddingBottom: 0 }}>
        {children}
      </GridColumn>
    </Grid>
  </Fragment>
);

export default SimpleLayout;

