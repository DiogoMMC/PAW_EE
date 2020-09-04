const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const client = require('./client')
const produtos = require('./produtos')

const reservationSchema = new Schema({
    numberOfPeople:{
        type: Number,
        required: true
    },
    courses:{
        type: [String],
        required:false
    },
    price:{
        type:Number,
        required:true
    }
    /*,reservationID:{
        type:mongoose.Types.ObjectId,
        required:true
    }*/
})


const Reservation = mongoose.model('Reservation',clientSchema);
module.exports = Reservation