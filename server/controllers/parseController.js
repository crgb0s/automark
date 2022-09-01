const cheerio = require('cheerio');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `parseController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in parseController.${method}. Check server logs for more details.` }
  };
};

const parseController = {};


parseController.parseEdmundsListing = (req, res, next) => {
  const $ = cheerio.load(res.locals.body);
  const summary = $('.vehicle-summary')
  const mileageString = summary.find($('[title="Mileage"]')).parent().parent().text();
  const mileage = Number(mileageString.split(' ')[0].replace(/,/g, ''))

  const hpString = summary.find($('[title="Horsepower"]')).parent().parent().text();
  const hp = Number(hpString.split(' ')[0].replace(/,/g, ''));
  res.locals.parsed = {mileage, hp};
  return next();
}




module.exports = parseController;
