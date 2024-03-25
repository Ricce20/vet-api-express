//IMPORTS
const fs = require('fs-extra');
const path = require('path');
const {CastError} =require('mongoose');
//models
const Employee = require('../models/employee.model');
//--------------------------------------------
async function getEmployees(req,res){
    try {
        let employees = await Employee.find({state:'activo'}).select('_id name lastName type image');
        return res.status(200).json({employees});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function getIdEmployee(req,res){
    try {
        const {id} = req.params;
        let employee = await Employee.findOne({_id:id,state:'activo'});

        return !employee
        ? res.status(404).json({message:"Empleado no Encontrado"})
        :res.status(200).json({employee});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function updateEmployee(req,res){
    try {
        const {id} =req.params;
        const {name,lastName,phone,type} = req.body;
        let urlfotoanterior;

        let employee = await  Employee.findOne({_id:id, state:'activo'});
        if(!employee){
            return res.status(404).json({message:'Empleado no Encontrado'});
        }


        await Employee.findByIdAndUpdate(id,{
            name,
            lastName,
            phone,
            type
           },{new:true}
        );

        if (employee.image) {
            urlfotoanterior = employee.image.split("/");
        }

        if (req.file) {

            const { filename } = req.file;
            employee.setimgurl(filename);
            await employee.save();

            if(urlfotoanterior && urlfotoanterior[4] === filename){
                return res.status(200).json({success:'Empleado Actualizado'});
            }

            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/employees/' + urlfotoanterior[4]))) {
                await fs.unlink(path.join(__dirname, '../public/uploads/employees/' + urlfotoanterior[4]));
            }
        }

        return res.status(200).json({success:'Empleado Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID de Empleado Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function deleteEmployee(req,res){
    try {
        const {id} = req.params;
        let employee = await Employee.findOne({_id:id, state:'activo'});

        if(!employee){
            return res.status(404).json({message:'Empleado no encontrado'});
        }
        await Employee.findByIdAndUpdate(id,{state:'inactivo'},{new:true});

        return res.status(200).json({success:'Empleado Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID de Empleado Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getEmployees,
    getIdEmployee,
    updateEmployee,
    deleteEmployee
}