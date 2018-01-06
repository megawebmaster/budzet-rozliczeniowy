import { connect } from 'react-redux';

import Header from '../components/header/Header';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
  page: state.location.type,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
