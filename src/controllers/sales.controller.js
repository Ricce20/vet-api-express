const Sale = require('../models/sales.model');
const {CastError} =require('mongoose');

async function getSales(req,res){
    try {
        let sales = await Sale.find().sort({date:-1});
        sales.forEach(sale=>{
            sale.toJSON = function(){
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
        return res.status(200).json({sales});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function getIdSale(req,res){
    try {
        const {id} = req.params;
        let sale = await Sale.findById(id)
        .populate({path:'ownerId', select:'name lastName'})
        .populate({path:"employeeId",select:'name lastName'});

        if(!sale){
            return res.status(404).json({message:'Registro no encontrado'});
        }

        sale.toJSON = function(){
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

        return res.status(200).json({sale});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

async function getSalesForOwnerId(req,res){
    try {
        const {id} = req.params;
        let sales = await Sale.find({ownerId:id}).sort({date:-1})
        .populate({path:'employeeId', select:'name lastName'})
        .populate({path:"payments"})
        
        sales.forEach(sale=>{
            sale.toJSON = function(){
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

        return res.status(200).json({sales});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function registerSale(req,res){
    try {
        const {employeeId,ownerId,payments,total} = req.body;
        let newSale =  new Sale({
            employeeId,
            ownerId,
            payments,
            total
        });

        await newSale.save();

        return res.status(201).json({success:'Pago registrado'});
    } catch (error) {
        return res.status(500).json({error:`Error encotrado: ${error.message}`});
    }
}

async function deleteSaleId(req,res){
    try{
        const {id} = req.params;
        let sale = await Sale.findById(id);

        if(!sale){
            return res.status(404).json({message:'Registro no encontrado'});
        }
        await Sale.findByIdAndDelete(id);
        return res.status(200).json({success:'Registro eliminado'});
    }catch(error){
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

module.exports  = {
    deleteSaleId,
    registerSale,
    getSalesForOwnerId,
    getIdSale,
    getSales
}