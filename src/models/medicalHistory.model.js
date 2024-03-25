const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    petId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    vetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true 
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['vacunacion','Desparasitacion','Cirugias','Medicacion','Examen_Medico'],
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MedicalHistory',medicalHistorySchema);