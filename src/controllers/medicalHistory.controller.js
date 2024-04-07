const MedicalH = require('../models/medicalHistory.model');
const {CastError} =require('mongoose');

async function getMedicalHostories(req,res){
    try {
        let histories = await MedicalH.find().sort({date:-1}).populate({path:'petId',select:'details.name specie'}).populate({path:'vetId',select:'name lastName type'});
        
        histories.forEach(history=>{
            history.toJSON = function(){
                return{
                    ...this.toObject(),
                    date:this.date.toLocaleDateString('es-ES',{
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric',
                        hour:'numeric',
                        minute:'numeric'
                    })
                }
            }
        })
        return res.status(200).json({histories});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function getIdHistory(req,res){
    try {
        const {id} = req.params;
        let history = await  MedicalH.findById(id).populate({path:'petId'}).populate({path:'vetId'});

        if(!history){
            return res.status(404).json({message:'Registro no encontrado'})
        }

        history.toJSON = function(){
            return{
                ...this.toObject(),
                date:this.date.toLocaleDateString('es-ES',{
                    day:'2-digit',
                    month:'2-digit',
                    year:'numeric',
                    hour:'numeric',
                    minute:'numeric'
                })
            }
        }
        return res.status(200).json({history});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function registerHistory(req,res){
    try {
        const {petId,vetId,description,category} = req.body;

        let newMedicalH = new MedicalH({
            petId,
            vetId,
            description,
            category
        });

        await newMedicalH.save();

        return res.status(201).json({success:'Registro guardado'});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function editHistory(req,res){
    try {
        const {id} = req.params;
        const {vetId,description,category} = req.body;

        let history = await MedicalH.findById(id);
        
        if(!history){
            res.status(404).json({message:'Registro no encontrado'});
        }
        await MedicalH.findByIdAndUpdate(id,
            {vetId,
            description,
            category},
            {new:true}
        );
        
        return res.status(200).json({success:'Registro Actualizado'});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function deleteHistory(req,res){
    try {
        const {id} = req.params;
        let history = await MedicalH.findById(id);
        if(!history){
            return res.status(404).json({message:'Registro no encontrado'});
        }
        await MedicalH.findByIdAndDelete(id);
        return res.status(200).json({success:'Registro Eliminado'})
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function getMedicalH_PetId(req,res){
    try {
        const {id} = req.params;
        let histories = await MedicalH.find({petId:id}).sort({date:-1}).populate({path:'vetId',select:'name lastName type'});
        
        histories.forEach(history=>{
            history.toJSON = function(){
                return{
                    ...this.toObject(),
                    date:this.date.toLocaleDateString('es-ES',{
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric',
                        hour:'numeric',
                        minute:'numeric'
                    })
                }
            }
        })

        return res.status(200).json({histories});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    
    }
}

module.exports = {
    deleteHistory,
    editHistory,
    registerHistory,
    getIdHistory,
    getMedicalHostories,
    getMedicalH_PetId

}