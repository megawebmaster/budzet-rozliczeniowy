import Accounts from './Accounts';
import IrregularBudget from './IrregularBudget';
import YearBudget from './YearBudget';

export { Accounts, IrregularBudget, YearBudget };

// import React from 'react';
// import { asyncComponent } from 'react-async-component';
// import { Segment } from 'semantic-ui-react';
//
// const Accounts = asyncComponent({
//   name: 'AccountsAsync',
//   resolve: () => import('./Accounts'),
//   LoadingComponent: () => <Segment loading />,
// });
// const IrregularBudget = asyncComponent({
//   name: 'IrregularBudgetAsync',
//   resolve: () => import('./IrregularBudget'),
//   LoadingComponent: () => <Segment loading />,
// });
// const YearBudget = asyncComponent({
//   name: 'YearBudgetAsync',
//   resolve: () => import('./YearBudget'),
//   LoadingComponent: () => <Segment loading />,
// });
//
// export { Accounts, IrregularBudget, YearBudget };
