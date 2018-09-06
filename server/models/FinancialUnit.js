const FinancialUnitsJson = require('./../data/financial_units');
const models = require('.');

class FinancialUnit {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static all() {
    return FinancialUnitsJson.finUnits.map((item) => {
      return new FinancialUnit(item.id, item.name);
    });
  }

  static find(id) {
    return FinancialUnit.all()
      .find((fn) => fn.id === id);
  }


  positions() {
    return models.Position.all()
      .filter((position) => position.financialUnitId === this.id);
  }

  sumPositions() {

    const sum = (total, position) => {
      return total + position.calculatedValueUSD();
    };

    return this.positions()
      .reduce(sum, 0);
  }
}

FinancialUnit.prototype.id = null;
FinancialUnit.prototype.name = null;

module.exports = FinancialUnit;
