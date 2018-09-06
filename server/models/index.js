// This file is here in order to avoid circular dependency between FinancialUnit and Position
// https://esdiscuss.org/topic/how-to-solve-this-basic-es6-module-circular-dependency-problem

const models = {
};
module.exports = models;
models.FinancialUnit = require('./FinancialUnit');
models.Position = require('./Position');
models.Currency = require('./Currency');

