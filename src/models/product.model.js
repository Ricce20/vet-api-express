//IMPORTS
const mongoose = require('mongoose');

//SCHEMA
const productSchema = new mongoose.Schema({
    product:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    },
    image2:{
        type:String
    },
    category:{
        type:String,
        enum:['Alimento', 'Higiene','Ropa', 'Accesorios', 'Juguetes'],
    },
    specie:{
        type:String,
        enum:['Felinos','Caninos','Rodores','Aves'],
        required: true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});


//METHOSD
productSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "http://localhost:3000/foto-prod/" + imagen;
}
productSchema.methods.setimgurl2 = function setimgurl2(imagen){
    this.image2 = "http://localhost:3000/foto-prod/" + imagen;
}
module.exports = mongoose.model('Product',productSchema);