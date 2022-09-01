const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controllers/sessionController');

sessionRouter.options('/', (req, res) => {
  console.log('received options call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.send();
})
sessionRouter.options('/:sessionId', (req, res) => {
  console.log('received options call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.send();
})

// Create a session in the database
// http://localhost:3000/session
sessionRouter.post('/', sessionController.createSession, (req, res) => {
  console.log('received post call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(201).json(res.locals.newSession);
});

// Get a session from the database
// http://localhost:3000/session/:sessionId
sessionRouter.get('/:sessionId', sessionController.getSession, (req, res) => {
  console.log('received get call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(200).json(res.locals.cars);
});

// Delete a session from the database
// http://localhost:3000/session/"vin"
sessionRouter.delete('/:sessionId', sessionController.deleteSession, (req, res) => {
  console.log('received delete call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(204).send();
});

sessionRouter.options('/:sessionId/:vin', (req, res) => {
  console.log('received options call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.send();
})

sessionRouter.delete('/:sessionId/:vin', sessionController.deleteCarFromSession, (req, res) => {
  console.log('received delete vin call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(201).send();
});

sessionRouter.post('/:sessionId/:vin', sessionController.addCarToSession, (req, res) => {
  console.log('received post vin call');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(204).send();
});

module.exports = sessionRouter;