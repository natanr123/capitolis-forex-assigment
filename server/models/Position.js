const PositionsJson = require('./../data/positions');
const FinancialUnit = require('./FinancialUnit');
const Currency = require('./Currency');

class Position {

  constructor(currencyName, notionalValue, financialUnitId) {
    this.currencyName = currencyName;
    this.financialUnitId = financialUnitId;
    this.notionalValue = notionalValue;
  }

  static all() {
    // In real life i would have to update the cache from time to time
    if (Position.cachedPositions) {
      return Position.cachedPositions;
    }

    Position.cachedPositions = PositionsJson.positions.map((item)=>{
      return new Position(item.data.currency.ccy, item.data.currency.notionalValue, item.fuOriginId);
    });

    return Position.cachedPositions;
  }

  financialUnit() {
    return FinancialUnit.find(this.financialUnitId);
  }

  currency() {
    return Currency.find(this.currencyName);
  }

  calculatedValueUSD() {
    return this.notionalValue * this.currency().rate;
  }

}


Position.cachedPositions = null;
Position.prototype.notionalValue = null;
Position.prototype.financialUnitId = null;
Position.prototype.currencyName = null;



module.exports = Position;

