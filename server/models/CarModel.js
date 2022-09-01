const mongoose = require('mongoose');
const {Schema} = mongoose;

const carSchema = new Schema({
  vin: {type: String, required: true},
  make: {type: String, required: true},
  model: {type: String, required: true},
  year: {type: Number, required: true},
  hp: Number,
  mileage: Number
});

const Car = mongoose.model('cars', carSchema);
module.exports = Car;
