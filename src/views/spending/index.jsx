import React from 'react';
import { asyncComponent } from 'react-async-component';
import { Segment } from 'semantic-ui-react';

const Spending = asyncComponent({
  name: 'SpendingAsync',
  resolve: () => import('./Spending'),
  LoadingComponent: () => <Segment loading />,
});

export { Spending };
