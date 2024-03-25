//IMPORTS-----------------------
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//SCHEMA---------------------------------
const ownerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        required:true,
        maxlength:10,
        trim:true
    },
    address:{
        type:String,
    },
    image:{
        type:String
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
        
});

//METHODS
ownerSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "https://vet-api-express.onrender.com/foto-own/" + imagen;
}

//TOKEN
ownerSchema.methods.generadorJWT = function(){
    return jwt.sign({
        id:this._id,
        userId:this.user,
    }, process.env.P_SECRET_TOKEN);
}

module.exports = mongoose.model('Owner',ownerSchema);