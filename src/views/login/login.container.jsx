import { connect } from 'react-redux';

import LoginView from './login.view';
import { status, userLoggedIn } from '../../components/login';

const mapStateToProps = (state) => ({
  status: status(state),
});
const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

