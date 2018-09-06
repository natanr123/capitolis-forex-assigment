import { fromJS } from 'immutable';
import * as constants from './constants';
export const initialState = fromJS({ positions: null, units: null, refreshTime: null, spinnerTimeFinished: false });

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.POSITIONS_LOADED:
      return state.set('positions', action.positions);
    case constants.UNITS_LOADED:
      return state.set('units', action.units);
    case constants.REFRESHED:
      return state.set('refreshTime', action.refreshTime);
    case constants.SPINNER_TINE_FINISHED:
      return state.set('spinnerTimeFinished', true);
    default:
      return state;
  }
}

export default problemReducer;
