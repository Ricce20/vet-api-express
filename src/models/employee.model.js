//IMPORTS
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//SCHEMA
const employeeSchema  = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        required:true,
        maxlength:10,
        trim: true,

    },
    type:{
        type:String,
        enum:['vet','admin','assistant','receptionist'],
        require:true
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
employeeSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "https://vet-api-express.onrender.com/foto-emp/" + imagen;
}

//TOKEN
employeeSchema.methods.generadorJWT = function(){
    return jwt.sign({
        id:this._id,
        userId:this.user,
        type: this.type
    }, process.env.P_SECRET_TOKEN);
}

//EXPORTS
module.exports = mongoose.model('Employee',employeeSchema);