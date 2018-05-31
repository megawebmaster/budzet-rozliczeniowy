import { connect } from 'react-redux';

import LoginView from './login.view';
import { setEncryptionPassword, status, userLoggedIn } from '../../components/login';

const mapStateToProps = (state) => ({
  status: status(state),
});
const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn()),
  setEncryptionPassword: () => dispatch(setEncryptionPassword())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

