import { connect } from 'react-redux';

import LoginView from './login.view';
import { addLoginError, status, userLoggedIn } from '../../components/login';

const mapStateToProps = (state) => ({
  status: status(state),
});
const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn()),
  addLoginError: (error) => dispatch(addLoginError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

