/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import JsonTable from 'ts-react-json-table';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import loadProblemWatcher from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { storeListing: { title: '', shortDescription: '', fullDescription: '' } };
  }


  componentDidMount() {
    this.props.loadPosition();
  }

  render() {
    const columns1 = [
      { key: 'financialUnitName', label: 'Financial Unit Name' },
      { key: 'notionalValue', label: 'Notional Value' },
      { key: 'currencyRate', label: 'Rate' },
      { key: 'currencyName', label: 'Currency' },
      { key: 'calculatedValueUSD', label: 'Calculated Value (in USD)' },
    ];

    return (
      <article>
        <Helmet>
          <title>Positions</title>
          <meta
            name="Positions page"
            content="Positions page"
          />
        </Helmet>
        <div>
          <h3>Positions</h3>
          <JsonTable columns={columns1} rows={ this.props.positions } />
        </div>
      </article>
    );
  }


}

export function mapDispatchToProps(dispatch) {
  return {
    loadPosition: () => {
      dispatch(actions.loadPositions());
    }
  };
}

ForexPage.propTypes = {
  loadPosition: PropTypes.func,
  positions: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  return {
    positions: state.get('forex').get('positions'),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'forex', reducer });
const withSaga = injectSaga({ key: 'forex', saga: loadProblemWatcher });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForexPage);
