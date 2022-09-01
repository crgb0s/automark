const Car = require('../models/CarModel');

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}


const errCreator = (methodName, message, err) => {
  let log = `Error occurred inside StudentController.${methodName}\nMessage: ${message}`;
  if (err) log += `\nerr: ${err}`;
  return {
    log,
    message
  };
};

const carController = {};

carController.createCar = (req, res, next) => {
  const { vin, make, model, year, mileage, hp } = req.body;
  Car.create(removeEmpty({ vin, make, model, year, mileage, hp }))
    .then(dbResponse => {
      res.locals.newCar = dbResponse;
      return next();
    })
    .catch(err => next(errCreator('createCar', 'Error saving new object to DB', err)));
}

carController.getCar = (req, res, next) => {
  const { vin } = req.params;
  Car.findOne({ vin })
    .then(dbResponse => {
      if (!dbResponse) return next(errCreator('getCar', 'Car not found in DB'));
      res.locals.car = dbResponse;
      return next();
    })
    .catch(err => next(errCreator('getCar', 'Error reading from DB', err)));
}


carController.deleteCar = (req, res, next) => {
  const { vin } = req.params;
  Car.findOneAndDelete({ vin })
    .then(dbResponse => {
      if (!dbResponse.deletedCount) return next(errCreator('deleteCar', 'Car not found in DB. Cannot delete.'));
      return next();
    })
    .catch(err => next(errCreator('deleteCar', 'Error Accessing DB. Cannot delete', err)));
}

carController.getAllCars = (req, res, next) => {
  Car.find({})
    .then(dbResponse => {
      if (!dbResponse) return next(errCreator('getCar', 'No cars found in DB'));
      res.locals.cars = dbResponse;
      return next();
    })
    .catch(err => next(errCreator('getCar', 'Error reading from DB', err)));
}
module.exports = carController;