const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    medication: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    details: {
        dosageForm: {
            type: String,
            enum: ['Tableta', 'Cápsula', 'Líquido', 'Inyección', 'Tópico', 'Gotas', 'Polvo', 'Suspensión', 'Ungüento', 'Gel'],
        },
        dosage: {
            type: String,
        },
        administrationRoute: {
            type: String,
            enum: ['Oral', 'Intravenoso', 'Intramuscular', 'Subcutáneo', 'Tópico', 'Rectal', 'Oftálmico', 'Ótico'],
        },
        precautions: {
            type: String,
        },
        dateExpiry: {
            type: Date,
        }
    },
    species: [{
        type: String,
        enum: ['Felinos', 'Caninos', 'Roedores', 'Aves'],
        required: true
    }],
    category: {
        type: String,
        enum: ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antiparasitario', 'Antifúngico', 'Antiviral', 'Otro'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});
//METHODS
medicationSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "http://localhost:3000/foto-medical/" + imagen;
}
module.exports = mongoose.model('Medication', medicationSchema);
