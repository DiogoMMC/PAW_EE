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
        required=true
    },
    id:{
        type:number,
        required:true
    }
})

const product= mongoose.model('product',productSchema);
module.exports= product