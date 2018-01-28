import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Field from '../../components/expenses-grid/fields/DayField';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
});

const DayField = ({ month, year, value, onUpdate, onInputMount, onKeyDown }) => (
  <Field month={month} year={year} value={value} onUpdate={onUpdate} onInputMount={onInputMount}
         onKeyDown={onKeyDown} />
);

DayField.defaultProps = {
  onInputMount: (_type, _input) => {},
  onKeyPress: (_evend, _data) => {},
};
DayField.propTypes = {
  onInputMount: PropTypes.func,
  onKeyDown: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default connect(mapStateToProps)(DayField);

