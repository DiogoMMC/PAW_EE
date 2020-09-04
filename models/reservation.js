const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const client = require('./client')
const produtos = require('./produtos')

const reservationSchema = new Schema({
    numberOfPeople:{
        type: number,
        required: true
    },
    courses:{
        type: produtos,// verificar se esta bem
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    reservationID:{
        type:number,
        required:true
    }
})

const Reservation = mongoose.model('Reservation',clientSchema);
module.exports = Reservation