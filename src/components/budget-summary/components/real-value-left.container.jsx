import React from 'react';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { realIncome } from '../../income-budget-table';
import { realExpenses } from '../../expenses-budget-table';
import { plannedIrregular } from '../../irregular-budget-table';
import { realSavings } from '../../savings-budget-table';

const mapStateToProps = (state) => ({
  value: realIncome(state) - realExpenses(state) - plannedIrregular(state) - realSavings(state),
});
const emptyFunc = () => {};

const SummaryRealValueLeft = ({ value }) => (
  <Input value={value} disabled decrypted isSaving={false} placeholder="" onChange={emptyFunc} />
);

export default connect(mapStateToProps)(SummaryRealValueLeft);
