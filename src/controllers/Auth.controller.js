//IMPORTS
const bcrypt =  require('bcrypt');
const {CastError} =require('mongoose');
//models
const Employee = require('../models/employee.model');
const Owner = require('../models/owner.model');
const User = require('../models/user.model');

//functions
async function login(req,res){
    try {
        const{email,password} = req.body;
        let usuario = await User.findOne({email: email,state:'activo'});
        
        if(!usuario){
            return res.status(404).json({message: "Usuario No Existente"})
        }

        if(!await bcrypt.compare(password, usuario.password)){
            return res.status(401).json({message: "Credenciales Incorrectas"});
        }
        const {_id,rol} = usuario;

        return res.status(200).json({user:{_id,rol,email}});
    } catch (error) {
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}//primary login 

async function loginEmployee(req, res) {
    const {id} = req.params;
    try {
        let employee = await Employee.findOne({user:id, state:'activo'});

        if(!employee){
            return res.status(404).json({message:"No se Encontro un Empelado Relacionado al Usuario"});
        }
        const {name,lastName,type,img} = employee;
        const jwtoken = employee.generadorJWT();

        return res.status(200).json({dataEmp: {name,lastName,type,img,jwtoken}});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID Proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function loginOwner(req,res){
    try {
        const {id} = req.params;
        let owner = await Owner.findOne({user: id, state:'activo'});

        if(!owner){
            return res.status(404).json({message:"No se Encontro una Cuenta Relacionado al Usuario"});
        }
        const {_id,name,lastName,phone,image} = owner;
        const jwtoken = owner.generadorJWT();

        return res.status(200).json({OwnData:{_id,name, lastName,phone,image,jwtoken}});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID Proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

module.exports = {
    login,
    loginEmployee,
    loginOwner
}