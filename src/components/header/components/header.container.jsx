import { connect } from 'react-redux';

import Header from './header';
import { budget, month, pageType, year } from '../../location';
import { availableBudgets, availableYears, currentBudget } from '../../configuration';
import { Authenticator } from '../../../App.auth';

const mapStateToProps = (state) => ({
  years: availableYears(state),
  year: year(state),
  month: month(state),
  page: pageType(state),
  budgets: availableBudgets(state),
  budget: currentBudget(state),
  budgetSlug: budget(state),
});

const mapDispatchToProps = () => ({
  onLogout: () => Authenticator.logout(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
