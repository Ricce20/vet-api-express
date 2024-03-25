const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    details: {
        name:{
            type: String,
            required: true 
        },
        breed: String,//raza
        age: String,//edad
        health:{
            type:String,
            enum:['Bueno','Malo','Regular','Excelente']
        },//estado de salud
        gender: {
            type: String,
            enum: ['Macho', 'Hembra']
        },
        weight: Number,//peso
        image: String
    },
    specie:{
        type:String,
        enum:['Felino','Canino','Roedor','Ave'],
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
}, { timestamps: true });

//METHODS
petSchema.methods.setimgurl = function setimgurl(imagen){
    this.details.image = "http://localhost:3000/foto-pet/" + imagen;
}

module.exports = mongoose.model('Pet',petSchema);