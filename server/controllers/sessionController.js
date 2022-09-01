const Session = require('../models/SessionModel');

const errCreator = (methodName, message, err) => {
  let log = `Error occurred inside sessionController.${methodName}\nMessage: ${message}`;
  if (err) log += `\nerr: ${err}`;
  return {
    log,
    message
  };
};

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}


const sessionController = {};

sessionController.createSession = (req, res, next) => {
  const { sessionId } = req.body;
  Session.create({ sessionId })
    .then(dbResponse => {
      res.locals.newSession = dbResponse;
      return next();
    })
    .catch(err => next(errCreator('createSession', 'Error saving new object to DB', err)));
}

sessionController.getSession = (req, res, next) => {
  const { sessionId } = req.params;
  Session.findOne({ sessionId })
    .then(dbResponse => {
      if(dbResponse){
        console.log('found cars for session' + sessionId);
        res.locals.cars = dbResponse.cars
      }
      return next();
    })
    .catch(err => next(errCreator('getSession', 'Error reading from DB', err)));
}


sessionController.deleteSession = (req, res, next) => {
  const { sessionId } = req.params;
  Session.findOneAndDelete({ sessionId })
    .then(dbResponse => {
      if (!dbResponse.deletedCount) return next(errCreator('deleteSession', 'Session not found in DB. Cannot delete.'));
      return next();
    })
    .catch(err => next(errCreator('deleteSession', 'Error Accessing DB. Cannot delete', err)));
}

sessionController.deleteCarFromSession = (req, res, next) => {
  const { sessionId, vin } = req.params;
  Session.findOneAndUpdate(
    { sessionId },
    { $pull: { 'cars': { vin } } }
  )
    .then(dbResponse => {
      if (!dbResponse) return next(errCreator('deleteCarFromSession', 'Session not found in DB. Cannot delete car.'));
      return next();
    })
    .catch(err => next(errCreator('deleteCarFromSession', 'Error Accessing DB. Cannot delete', err)));
}

sessionController.addCarToSession = (req, res, next) => {
  console.log('your params sir', req.params)
  const { sessionId, vin } = req.params;
  const { make, model, year, mileage, hp } = req.body;
  const carToInsert = removeEmpty({ vin, make, model, year, mileage, hp });
  Session.findOneAndUpdate(
    { sessionId },
    { $addToSet: { 'cars':  carToInsert} },
  )
    .then(dbResponse => {
      if (!dbResponse){
        Session.create({ sessionId, car: [carToInsert] })
        .then(dbResponse => {
          res.locals.newSession = dbResponse;
          return next();
        })    
      } else{
        return next();
      }
    })
    .catch(err => next(errCreator('addCarToSession', 'Error Accessing DB. Cannot addCarToSession', err)));
}

module.exports = sessionController;