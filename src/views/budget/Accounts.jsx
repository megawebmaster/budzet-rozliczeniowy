import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({});

class Accounts extends Component {
  format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

  render() {
    return (
      <div>
        <Helmet>
          <title>Budżet - stan kont</title>
        </Helmet>
        Stan kont tutaj będzie
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Accounts));

