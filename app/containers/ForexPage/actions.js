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

export function loadUnits() {
  return {
    type: constants.LOAD_UNITS,
  };
}


export function unitsLoaded(units) {
  return {
    type: constants.UNITS_LOADED,
    units
  };
}
