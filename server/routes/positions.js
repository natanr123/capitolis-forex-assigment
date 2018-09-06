const express = require('express');
const models = require('./../models');
const initCurrencyMiddleware = require('./../middlewares/initCurrencyMiddleware');

const router = express.Router();


function getRows() {
  const positions = models.Position.all();

  return positions.map((position) => {
    const financialUnitName = position.financialUnit().name;
    const currency = position.currency();
    return { financialUnitName,
      notionalValue: position.notionalValue,
      currencyRate: models.Currency.money(currency.rate, 5),
      currencyName: currency.name,
      calculatedValueUSD: models.Currency.money(position.calculatedValueUSD()),
    };
  });
}

function list(req, res) {
  res.send(getRows());
}

function csv(req, res) {
  const csvArr = getRows().map((row) => {
    return Object.values(row).join(',');
  });
  csvArr.unshift(['Financial Unit Name', 'Notional Value', 'Rate', 'Currency', 'Calculated Value (in USD)']);
  const csvText = csvArr.join('\r\n');
  res.setHeader('Content-disposition', `attachment; filename=positions_${Date.now()}.csv`);
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csvText);
}


router.get('/', initCurrencyMiddleware, list);
router.get('/csv', initCurrencyMiddleware, csv);
module.exports = router;
