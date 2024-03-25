//IMPORTS
const mongoose = require('mongoose');

//ModelSchema
const medicalEntrySchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
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

module.exports = mongoose.model('MedicalEntry',medicalEntrySchema);