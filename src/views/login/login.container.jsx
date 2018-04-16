import { connect } from 'react-redux';
import { redirect } from 'redux-first-router';

import LoginView from './login.view';
import { ROUTE_BUDGET_MONTH } from '../../routes';

const mapDispatchToProps = (dispatch) => ({
  redirectToBudget: () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    dispatch(redirect({ type: ROUTE_BUDGET_MONTH, payload: { year, month } }));
  },
});

export default connect(null, mapDispatchToProps)(LoginView);

