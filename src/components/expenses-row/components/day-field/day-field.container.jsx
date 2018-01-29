import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Field from './day-field';
import { month, year } from '../../../location';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
});

const DayFieldContainer = ({ month, year, value, onUpdate, onInputMount, onKeyDown }) => (
  <Field month={month} year={year} value={value} onUpdate={onUpdate} onInputMount={onInputMount}
         onKeyDown={onKeyDown} />
);

DayFieldContainer.defaultProps = {
  onInputMount: (_type, _input) => {},
  onKeyPress: (_evend, _data) => {},
};
DayFieldContainer.propTypes = {
  onInputMount: PropTypes.func,
  onKeyDown: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

export default connect(mapStateToProps)(DayFieldContainer);

