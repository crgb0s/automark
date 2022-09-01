const mongoose = require('mongoose');
const {Schema} = mongoose;

const sessionSchema = new Schema({
  sessionId: {type: String, required: true},
  cars: []
});

const Session = mongoose.model('sessions', sessionSchema);
module.exports = Session;
