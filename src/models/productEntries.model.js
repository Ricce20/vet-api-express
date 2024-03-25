//IMPORTS
const mongoose = require('mongoose');

//SCHEMA MODEL

const productEntrySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number, 
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('ProductEntry', productEntrySchema);
