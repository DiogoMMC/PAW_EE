const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    reservations:{//id de todas as reservas feitas por este cliente
        type: reservation,
        required:true
    },
    clientID:{
        type:Number,
        required:true
    }
})

const Client= mongoose.model('Client',clientSchema);
module.exports= Client