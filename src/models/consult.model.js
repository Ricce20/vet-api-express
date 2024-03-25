const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
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
    nameVet:{
        type:String,
        required:true
    },
    diagnosis:{
        type:String,
        required:true
    },
    observations:{
        type:String,
    },
    signs:{
        type:String,
    },
    treatment:{
        type:String,
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consultation',consultationSchema);