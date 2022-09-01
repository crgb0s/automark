const carRouter = express.Router();

carRouter.options('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.send();
})
// Create a car in the database
// http://localhost:3000/car
carRouter.post('/', carController.createCar, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  return res.status(201).json(res.locals.newCar);
});

// Get a car from the database
// // http://localhost:3000/car/"vin"
// carRouter.get('/:vin', carController.getCar, (req, res) => {
//   return res.status(200).json(res.locals.car);
// });

// carRouter.get('/', carController.getAllCars, (req, res) => {
//   return res.status(200).json(res.locals.cars);
// })

// // Delete a car from the database
// // http://localhost:3000/car/"vin"
// carRouter.delete('/:vin', carController.deleteCar, (req, res) => {
//   return res.status(204).send();
// });

module.exports = carRouter;