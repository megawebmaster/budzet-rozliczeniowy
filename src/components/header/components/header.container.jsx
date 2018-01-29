import { connect } from 'react-redux';

import Header from './header';
import { month, pageType, year } from '../../location';
import { availableYears } from '../../configuration';

const mapStateToProps = (state) => ({
  years: availableYears(state),
  year: year(state),
  month: month(state),
  page: pageType(state),
});

export default connect(mapStateToProps)(Header);
