const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const client = require('./client')
const produtos = require('./produtos')

const reservationState={
    HOLD:"pendente",
    CONFIRMED:'confirmada',
    CANCELED:'cancelada',
    LEFT:'nao compareceu'
};
const MEAL={
    LUNCH:"almoço",
    DINNER:"jantar"
};

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
    },
    state:{
        type:reservationState,
        required:true
    },
    meal:{
        type:MEAL,
        required:true
    }
})


const Reservation = mongoose.model('Reservation',clientSchema);
module.exports = Reservation