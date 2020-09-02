import product from './produtos';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('product')

const ementaSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    courses:{
        type:product,
        required:true
    },
    drinks:{
        type:product,
        required:true
    },
    extras:{
        type:product,
        required:true
    }
})

const ementa= mongoose.model('ementa',ementaSchema);
module.exports=ementa;