import React from 'react';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { plannedIncome } from '../../income-budget-table';
import { plannedExpenses } from '../../expenses-budget-table';
import { plannedIrregular } from '../../irregular-budget-table';
import { plannedSavings } from '../../savings-budget-table';

const mapStateToProps = (state) => ({
  value: plannedIncome(state) - plannedExpenses(state) - plannedIrregular(state) - plannedSavings(state),
});
const emptyFunc = () => {};

const SummaryPlannedValueLeft = ({ value }) => (
  <Input value={value} disabled decrypted isSaving={false} placeholder="" onChange={emptyFunc} />
);

export default connect(mapStateToProps)(SummaryPlannedValueLeft);
