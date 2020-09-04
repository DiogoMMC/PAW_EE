const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTypes={
    COURSE: 'course',
    DRINK:'drink',
    DESSERT:'dessert',
    EXTRA:'extra'
};


const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: productTypes,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})


const Product= mongoose.model('Produto',productSchema);
module.exports= Product