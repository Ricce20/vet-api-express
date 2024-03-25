//IMPORTS
const mongoose = require('mongoose');

//Schema

const serviceSchema = new mongoose.Schema({
    service: { type: String, required: true },
    description: { type: String },
    felino: {
        P: { type: Number},
        M: { type: Number},
        G: { type: Number}
    },
    canino: {
        P: { type: Number},
        M: { type: Number},
        G: { type: Number}
    },
    
    category: { type: String, enum:['Estetica', 'Medica'], required: true },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});

module.exports = mongoose.model('Service',serviceSchema);