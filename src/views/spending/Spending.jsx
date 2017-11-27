import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import SpendingGrid from './spending-grid/SpendingGrid';
import './spending.css';

const mapStateToProps = (state) => ({
  year: state.location.payload.year,
  month: state.location.payload.month,
});

const mapDispatchToProps = (dispatch) => ({});

class Spending extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { month, year } = this.props;

    return (
      <div>
        <Helmet>
          <title>Rozliczenie - {this.format(`month.${month}`, month)} {`${year}`}</title>
        </Helmet>
        <Segment>
          <h3>
            Rozliczenie: {this.format(`month.${month}`, month)} {year}
          </h3>
        </Segment>
        <SpendingGrid />
      </div>
    );
  }
}

Spending.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Spending));

