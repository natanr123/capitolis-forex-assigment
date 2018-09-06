const axios = require('axios').default;

class Currency {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
  }

  /*
  Only after we init the currencies we can use this class
   */
  static async init() {
    if (Currency.cached) {
      console.log('currencies have already been cached');
      return Currency.cached;
    }
    const fixerUrl = 'http://data.fixer.io/api/latest?access_key=c3cf4fa562b16d176f7462c0c30496f4&format=1';
    console.log('calling fixer api');
    const response = await axios.get(fixerUrl)
    const { data } = response;
    const baseRates = data.rates;
    const baseToUSD = data.rates.USD;
    const keys = Object.keys(baseRates);
    Currency.cached = keys.map((key) => {
      const value = baseRates[key];
      return new Currency(key, baseToUSD / value);
    });
    return Currency.cached;
  }

  static all() {
    return Currency.cached;
  }

  static find(name) {
    return Currency.all().find((currency) => name === currency.name);
  }
}
Currency.cached = null;
Currency.prototype.name = null;
Currency.prototype.rate = null;


module.exports = Currency;