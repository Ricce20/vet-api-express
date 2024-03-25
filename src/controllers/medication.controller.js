//IMPORTS
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')
//MODELS
const Medication = require('../models/medication.model');
const MedicalEntry = require('../models/medicalEntries.model');


//FUNCTIONS
async function getMedicines(req,res){
    try {
        let medicines = await Medication.find({state:'activo'}).select('_id name description image quantity');

        return res.status(200).json({medicines});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function getIdMedicine(req,res){
    try {
        const {id} = req.params;

        let medicine = await Medication.findById(id);
        return !medicine 
        ? res.status(404).json({message:'Medicamento no encontrado'})
        : res.status(200).json({medicine});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Medicamento  proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function registerMedicine(req,res){
    
        try {
            const {medication,description,dosageForm,dosage,precautions,dateExpiry,administrationRoute,species, category,price,quantity} = req.body;
    
            const newMedication = new Medication({
                medication,
                description,
                details: {
                    dosageForm,
                    dosage,
                    administrationRoute,
                    precautions,
                    dateExpiry
                },
                species,
                category,
                price,
                quantity
            });

            if(req.file){
                const {filename} = req.file;
                newMedication.setimgurl(filename);
            }

            await newMedication.save();

            return res.status(201).json({success:'Registro Guardado'});


    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.medication) {
            // Si el error es debido a un correo electrónico duplicado, enviar un mensaje de error
            return res.status(400).json({error:'El Medicamento ya existente.'});
        } 
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}

async function updateMedicine(req,res){
    try {
        const {id} = req.params;
        const {medication,description,dosageForm,dosage,precautions,dateExpiry,administrationRoute,species, category,price,quantity} = req.body;
        let urlfotoanterior;


        let medicine = await Medication.findById(id);

        if(!medicine){
            return res.status(404).json({message:'Medicamento no Encontrado'});
        }

        await Medication.findByIdAndUpdate(id,{
            medication,
            description,
            details: {
                dosageForm,
                dosage,
                administrationRoute,
                precautions,
                dateExpiry
            },
            species,
            category,
            price,
            quantity
        },{new:true});
        
        if (medicine.image) {
            urlfotoanterior = medicine.image.split("/");
        }

        if (req.file) {
            const { filename } = req.file;
            medicine.setimgurl(filename);
            await medicine.save();

            if(urlfotoanterior && urlfotoanterior[4] === filename){
                return res.status(200).json({success:'Registro Actualizado'});
            }

            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/medical/' + urlfotoanterior[4]))) {
                await fs.unlink(path.join(__dirname, '../public/uploads/medical/' + urlfotoanterior[4]));
            }
        }

        return res.status(200).json({success:'Registro Actualizado'});
        
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Medicamento  proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function deleteMedicine(req,res){
    try {
        const {id} = req.params;
        let medicine = await Medication.findById(id);
        
        if(!medicine){
           return res.status(404).json({message:'Medicamento no Encontrado'})
        }

        await Medication.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});

        return res.status(200).json({success:'Registro Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Medicamento  proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}


async function entryMedications(req,res){
    try {
        const {id} = req.params;
        const {quantity,price} = req.body;

        let medicine = await Medication.findById(id);

        if(!medicine){
            return res.status(404).json({message:'Medicamento no Encontrado'});
        }

        let updateQuantity = Number(medicine.quantity) + Number(quantity);

        let updateMedicine = await Medication.findByIdAndUpdate(id,{quantity:updateQuantity},{new:true});

        if(updateMedicine){
            const entry = new MedicalEntry({
                medicine:id,
                quantity,
                price,
                total: quantity * price,
                date: Date.now()
                
            });

            entry.save();
        }

        return res.status(201).json({success:'Entrada Registrada'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Medicamento  proporcionada es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

module.exports = {
    deleteMedicine,
    getIdMedicine,
    getMedicines,
    updateMedicine,
    registerMedicine,
    entryMedications
}