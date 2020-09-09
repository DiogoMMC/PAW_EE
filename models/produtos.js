const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["course", "drink", "dessert", "extra"],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


const Product = mongoose.model('Produto', productSchema);
module.exports = Product