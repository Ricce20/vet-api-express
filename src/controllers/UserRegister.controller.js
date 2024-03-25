//IMPORTS----------------------------------
const bcrypt =  require('bcrypt');
//MODELS
const User = require('../models/user.model');
const Employee = require('../models/employee.model');
const Owner = require('../models/owner.model');

//REGISTER - EMPLOYEE------------------------------------

async function RegisterEmployee(req,res){

    const {email,password,name,lastName,phone,type} = req.body;
    try {
        //encryp password
        let salt = await bcrypt.genSalt(10);
        let passcifrado = await bcrypt.hash(password, salt);
        //register-user
        const newUser = new User({
            email,
            password: passcifrado,
            rol:1//rol 1 = User Employee
        });
        await newUser.save();
        //register employee
        const newEmployee = new Employee({
        user: newUser._id,
        name,
        lastName,
        phone,
        type,
        image: 'http://localhost:3000/foto-emp/default.jpg'
       });

       if(req.file){
        const {filename} = req.file;
        newEmployee.setimgurl(filename);
        }
        await newEmployee.save();

        return res.status(201).json({success:"Registro Exitoso"});

    } catch (error) {
        if (error.errors && error.errors.type && error.errors.type.kind === 'enum') {
            // Si el error es debido a un valor no válido en el Enum, podemos proporcionar un mensaje de error personalizado
            const errorMessage = `El valor '${error.errors.type.value}' no es válido para el campo 'type'`;
            return res.status(400).json({ message: errorMessage });
        }
        // Verificar si el error es debido a un campo único duplicado (correo electrónico)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Si el error es debido a un correo electrónico duplicado, enviar un mensaje de error
            return res.status(409).json({message:'El correo electrónico ya está en uso.'});
        } 
        return res.status(500).json({error:`Error encontrado: ${error.message}`}); 
    }
}

//REGISTER CUSTOMER-WONER----------------------

async function RegisterOwner(req,res){

    const {email,name,lastName,phone,} =req.body;
    
    try {
        //encryp password
        let salt = await bcrypt.genSalt(10);
        let passcifrado = await bcrypt.hash(email, salt);
        //register-user
        const newUser = new User({
            email,
            password: passcifrado,
            rol:2// rol 2 = User owner
        });
        await newUser.save();
       
       const newOwner = new Owner({
        user: newUser._id,
        name,
        lastName,
        phone,
        image: 'http://localhost:3000/foto-own/default.jpg'

       });

       if(req.file){
            const {filename} = req.file;
            newOwner.setimgurl(filename);
        }
        await newOwner.save();

        return res.status(201).json({success:"Registro Exitoso"});

    } catch (error) {
        // Verificar si el error es debido a un campo único duplicado (correo electrónico)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Si el error es debido a un correo electrónico duplicado, enviar un mensaje de error
           return res.status(400).json({message:'El Correo electrónico ya está en uso.'});
        } 
        return res.status(500).json({error:`Error encontrado: ${error.message}`}); 
    }
}

module.exports = {
    RegisterEmployee,
    RegisterOwner
}