const express = require('express');
const Position = require('./../models/Position');
const initCurrencyMiddleware = require('./../middlewares/initCurrencyMiddleware');

const router = express.Router();

function list(req, res) {

  const money = (num) => Number((num).toFixed(2,10));
  const positions = Position.all();

  const rows = positions.map((position) => {
    const financialUnitName = position.financialUnit().name;
    const currency = position.currency();
    return { financialUnitName,
      notionalValue: position.notionalValue,
      currencyRate: money(currency.rate),
      currencyName: currency.name,
      calculatedValueUSD: money(position.calculatedValueUSD()),
    };
  });
  res.send(rows);
}


router.get('/', initCurrencyMiddleware, list);
module.exports = router;
