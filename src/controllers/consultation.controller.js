const Consult  = require('../models/consult.model');
const {CastError} =require('mongoose');

async function getConsults(req,res){
    try {
        let consults = await Consult.find().sort({date:-1}).populate({path:'petId', select:'details.name specie'}).populate({path:'vetId',select:'name lastName'});
        
        consults.forEach(consult => {
            consult.toJSON = function(){
                return{
                    ...this.toObject(),
                    date:this.date.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })
                }
            }
        })
        return res.status(200).json({consults});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado(metodo all): ${error.message}`})
    }
}

async function getIdConsult(req,res){
    try {
        const {id} = req.params;
        let consult =  await  Consult.findById(id).populate({path:'petId',select:'details specie state'}).populate({path:'vetId',select:'name lastName  type  state'});
        if(!consult){
            return res.status(404).json({message:'Consulta no Encontrada'});
        }
        consult.toJSON = function(){
            return{
                ...this.toObject(),
                date:this.date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })
            }
        }
        return res.status(200).json({consult});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

async function getConsultForPetId(req,res){
    try {
        const {id} = req.params;
        let consults = await  Consult.find({petId:id}).sort({date:-1}).populate({path:'vetId',select:'name lastName type'});
        consults.forEach(consult => {
            consult.toJSON = function(){
                return{
                    ...this.toObject(),
                    date:this.date.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })
                }
            }
        })
        return res.status(200).json({consults});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function registerConsult(req,res){
    try {
        const {petId,vetId,nameVet,diagnosis,observations,signs,treatment} = req.body;

        let newConsult = new Consult({
            petId,
            vetId,
            nameVet,
            diagnosis,
            observations,
            signs,
            treatment
        });

        await newConsult.save();

        return res.status(201).json({success:'Consulta Guardada'});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function editConsult(req,res){
    try {
        const {id} = req.params;
        const {vetId,nameVet,diagnosis,observations,signs,treatment} = req.body;

        let consult = await  Consult.findById(id);
        if(!consult){
            return res.status(404).json({message:'Consulta no Encontrada'});
        }

        await Consult.findByIdAndUpdate(id,
            {
                vetId,
                nameVet,
                diagnosis,
                observations,
                signs,
                treatment 
            },{new:true});
        
        return res.status(200).json({success:'Consulta Actualizada'})
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}



module.exports = {
    editConsult,
    getConsultForPetId,
    getConsults,
    getIdConsult,
    registerConsult
}