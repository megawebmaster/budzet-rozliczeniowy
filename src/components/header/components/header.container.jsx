import { connect } from 'react-redux';

import Header from './header';
import { month, pageType, year } from '../../location';
import { availableYears } from '../../configuration';
import { Authenticator } from '../../../App.auth';

const mapStateToProps = (state) => ({
  years: availableYears(state),
  year: year(state),
  month: month(state),
  page: pageType(state),
});

const mapDispatchToProps = () => ({
  onLogout: () => Authenticator.logout(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
