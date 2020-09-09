const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Produto',
    required: false
  }],
  price: {
    type: Number,
    required: false
  },
  state: {
    type: String,
    enum: ["hold", "confirmed", "canceled", "noshow"],
    required: true
  },
  meal: {
    type: String,
    enum: ["lunch", "dinner"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
})


const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation