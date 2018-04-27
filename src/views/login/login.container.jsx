import { connect } from 'react-redux';

import LoginView from './login.view';
import { userLoggedIn } from './login.actions';

const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn()),
});

export default connect(null, mapDispatchToProps)(LoginView);

