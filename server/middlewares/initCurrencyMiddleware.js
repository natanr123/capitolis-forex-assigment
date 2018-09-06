const Currency = require('./../models/Currency');

module.exports = (req, res, next) => {
  Currency.init().then(() => {
    next();
  }).catch((err)=> {
    next(err);
  });
};
