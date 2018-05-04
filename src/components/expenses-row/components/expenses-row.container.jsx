import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Row from './expenses-row';
import { expensesCategoriesForDropdown } from '../expenses-row.selectors';

const mapStateToProps = (state) => ({
  categories: expensesCategoriesForDropdown(state),
});

export default connect(mapStateToProps)(injectIntl(Row));

