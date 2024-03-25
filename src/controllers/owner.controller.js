//IMPORTS
const fs = require('fs-extra');
const path = require('path');
const {CastError} =require('mongoose');
//MODELS
const Owner = require('../models/owner.model');
//------------------------------------------------
async function getOwners(req,res){
    try {
        let owners = await Owner.find({state:'activo'}).select('_id name lastName image');
        return res.status(200).json({owners});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado ${error.message}`});
    }
}

async function getIdOwner(req,res){
    try {
        const {id} = req.params;
        let owner = await Owner.findOne({_id:id, state:'activo'});

        return !owner 
        ? res.status(404).json({message:'Dueño no encontrado'})
        : res.status(200).json({owner});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function updateOwner(req,res){
    try {
        const {name,lastName,phone,} =req.body;
        const {id} = req.params;
        let urlfotoanterior;

        let owner = await Owner.findOne({_id:id, state:'activo'});

        if(!owner){
            return res.status(404).json({message:'Deño no encontrado'});
        }

        await Owner.findByIdAndUpdate(id,{
            name,
            lastName,
            phone
            },{new:true}
        );

        if (owner.image) {
            urlfotoanterior = owner.image.split("/");
        }

        if (req.file) {
            const { filename } = req.file;
            owner.setimgurl(filename);
            await owner.save();
            
            if(urlfotoanterior && urlfotoanterior[4] === filename){
                return res.status(200).json({success:'Datos Actualizados'});
            }

            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/owner/' + urlfotoanterior[4]))) {
                await fs.unlink(path.join(__dirname, '../public/uploads/owner/' + urlfotoanterior[4]));
            }
        }

        return res.status(200).json({sucess:'Dueño Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function deleteOwner(req,res){
    try {
        const {id} =req.params;

        let owner = await Owner.findOne({_id:id, state:'activo'});

        if(!owner){
            return res.status(404).json({message:'No se encontro al dueño'});
        }

        await Owner.findByIdAndUpdate(id,{state:'inactivo'},{new:true});
        return res.status(200).json({message:'Dueño eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID de Dueño Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getOwners,
    getIdOwner,
    updateOwner,
    deleteOwner
}