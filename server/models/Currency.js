const axios = require('axios').default;

class Currency {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
  }

  /**
   * Only after we init the currencies we can use this class
   * In real life it may be better to revalidate the cache by worker
   * @returns {Promise<null>}
   */
  static async init() {
    if (Currency.cached && ((Date.now() - Currency.cachingTime) >= 10000)) {
      console.log('currencies have already been cached');
      return Currency.cached;
    }
    const fixerUrl = 'http://data.fixer.io/api/latest?access_key=c3cf4fa562b16d176f7462c0c30496f4&format=1';
    console.log('calling fixer api');
    const response = await axios.get(fixerUrl);
    const { data } = response;
    const baseRates = data.rates;
    const baseToUSD = data.rates.USD;
    const keys = Object.keys(baseRates);
    Currency.cached = keys.map((key) => {
      Currency.cachingTime = Date.now();
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

  /*
  Utility function for formatting money values
   */
  static money(num, precision = 2) {
    return Number((num).toFixed(precision, 10));
  }
}
Currency.cachingTime = null;
Currency.cached = null;
Currency.prototype.name = null;
Currency.prototype.rate = null;


module.exports = Currency;
