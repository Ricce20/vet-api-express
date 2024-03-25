//IMPORTS
const Service = require('../models/service.model');
const {CastError} =require('mongoose');

async function getServices(req,res){
    try {
        const services = await Service.find({});
        return res.status(200).json({services});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado : ${error.message}`});
    }
}

async function IdGetService(req,res){
    try {
        const {id} = req.params;
        let service = await Service.findById(id);

        return !service
        ? res.status(404).json({message: 'No se encontro el servicio'})
        :res.status(200).json({service});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Servicio proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function createService(req,res){
    try {
        const {service,description,felino,canino,category} = req.body;

        const newService = new Service({
            service,
            description,
            felino,
            canino,
            category
        });

        await newService.save();

        return res.status(200).json({success: 'Servicio Creado'});

    }catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.service) {
            return res.status(400).json({ message: 'El Servicio ya se Encunetra Existente'});
        } 
        return res.status(500).json({error: `Error encontrado: ${error.message}`}); 
    }
}

async function updateService(req,res){
    try {
        const {id} = req.params;
        const {service,description,felino,canino,category} = req.body;

        let servi = await Service.findById(id);

        if(!servi){
            return res.status(404).json({message:'Servicio no encontrado'});
        }

        await Service.findByIdAndUpdate(id,{
            service,
            description,
            felino,
            canino,
            category
        },{new:true});

        return res.status(200).json({success:'Servicio Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function deleteService(req,res){
    try {
        const {id} = req.params;
        let service = await  Service.findById(id);

        if(!service){
            return res.status(404).json({message:`Servicio no encontrado`});
        }
        await Service.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});

        return res.status(200).json({success:'Servico Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Servicio proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//function for owners
async function getServicesActived(req,res){
    try {
        let services = await Service.find({state:'activo'});
        return res.status(200).json({services});
    } catch (error) {
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getServices,
    IdGetService,
    createService,
    updateService,
    deleteService,
    getServicesActived
}