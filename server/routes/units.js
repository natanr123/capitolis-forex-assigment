const express = require('express');
const FinancialUnit = require('./../models/FinancialUnit');
const initCurrencyMiddleware = require('./../middlewares/initCurrencyMiddleware');

const router = express.Router();

function list(req, res) {
  const units = FinancialUnit.all();
  const rows = units.map((unit) =>{
    const positions = unit.positions();
    const numOfPositions = positions.length;
    const sum = unit.sumPositions();
    console.log(unit.id, numOfPositions, sum);
  });
  res.send(units);
}


router.get('/', initCurrencyMiddleware, list);
module.exports = router;
