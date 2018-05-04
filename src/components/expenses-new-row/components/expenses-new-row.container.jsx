import { connect } from 'react-redux';

import Row from './expenses-new-row';
import { addItem } from '../../expenses';
import { month, year } from '../../location';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
});
const mapDispatchToProps = dispatch => ({
  addItem: (row, year, month) => dispatch(addItem(row, year, month)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  onAddItem: (row) => dispatchProps.addItem(row, stateProps.year, stateProps.month),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Row);
