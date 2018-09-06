const express = require('express');
const FinancialUnit = require('./../models/FinancialUnit');
const Currency = require('./../models/Currency');
const initCurrencyMiddleware = require('./../middlewares/initCurrencyMiddleware');

const router = express.Router();

function list(req, res) {
  const units = FinancialUnit.all();
  const rows = units.map((unit) =>{
    const positions = unit.positions();
    const positionsCount = positions.length;
    const positionsSum = Currency.money(unit.sumPositions());
    return {
      name: unit.name,
      positionsCount,
      positionsSum
    };
  });
  res.send(rows);
}


router.get('/', initCurrencyMiddleware, list);
module.exports = router;
