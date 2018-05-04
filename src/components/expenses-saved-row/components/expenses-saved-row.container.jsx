import { connect } from 'react-redux';

import Row from './expenses-saved-row';
import { removeItem, saveItem } from '../../expenses';
import { month, year } from '../../location';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
});
const mapDispatchToProps = dispatch => ({
  saveItem: (row, year, month) => dispatch(saveItem(row, year, month)),
  removeItem: (row, year, month) => dispatch(removeItem(row, year, month)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  categories: stateProps.categories,
  onSaveItem: (row) => dispatchProps.saveItem(row, stateProps.year, stateProps.month),
  onRemoveItem: (row) => dispatchProps.removeItem(row, stateProps.year, stateProps.month),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Row);
