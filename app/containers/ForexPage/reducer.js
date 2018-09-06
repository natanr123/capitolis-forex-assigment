import { fromJS } from 'immutable';
import * as constants from './constants';
export const initialState = fromJS( {positions: []} );

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.POSITIONS_LOADED:
      return state.set('positions', action.positions);
    default:
      return state;
  }
}

export default problemReducer;
