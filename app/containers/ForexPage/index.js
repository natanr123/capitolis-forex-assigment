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
import LoadingIndicator from 'components/LoadingIndicator';
import reducer from './reducer';
import loadProblemWatcher from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForexPage extends React.PureComponent {

  componentDidMount() {
    this.props.startSpinner(3000);
    this.props.startRefreshCycle(10000);
  }

  render() {
    const positionsColumns = [
      { key: 'financialUnitName', label: 'Financial Unit Name' },
      { key: 'notionalValue', label: 'Notional Value' },
      { key: 'currencyRate', label: 'Rate' },
      { key: 'currencyName', label: 'Currency' },
      { key: 'calculatedValueUSD', label: 'Calculated Value (in USD)' },
    ];

    const unitsColumns = [
      { key: 'name', label: 'Name' },
      { key: 'positionsCount', label: 'Positions Count' },
      { key: 'positionsSum', label: 'Positions Sum (in USD)' },
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
        { this.props.spinnerTimeFinished ? '' : <LoadingIndicator /> }
        <h2>Created By: Natan Rubinstein</h2>
        <div>
          <h3>{`Last Refresh: ${this.props.refreshTime}`}</h3>
        </div>
        <div>
          <a href={'/positions/csv'}>Export to Excel</a>
          <h3>Positions</h3>
          <JsonTable columns={positionsColumns} rows={this.props.positions} />
        </div>
        <div>
          <h3>Units</h3>
          <JsonTable columns={unitsColumns} rows={this.props.units} />
        </div>

      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    startRefreshCycle: (interval) => {
      dispatch(actions.startRefreshCycle(interval));
    },
    startSpinner: (delay) => {
      dispatch(actions.startSpinner(delay));
    }
  };
}

const mapStateToProps = (state) => ({
  positions: state.get('forex').get('positions'),
  units: state.get('forex').get('units'),
  refreshTime: state.get('forex').get('refreshTime'),
  spinnerTimeFinished: state.get('forex').get('spinnerTimeFinished'),
});

ForexPage.propTypes = {
  startRefreshCycle: PropTypes.func,
  positions: PropTypes.any,
  units: PropTypes.any,
  refreshTime: PropTypes.any,
  spinnerTimeFinished: PropTypes.bool,
  startSpinner: PropTypes.func,
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
