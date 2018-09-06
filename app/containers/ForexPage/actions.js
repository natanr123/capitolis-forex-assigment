import * as constants from './constants';


export function loadPositions() {
  return {
    type: constants.LOAD_POSITIONS,
  };
}


export function positionsLoaded(positions) {
  return {
    type: constants.POSITIONS_LOADED,
    positions
  };
}
