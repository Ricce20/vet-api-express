//IMPORTS
const Pet = require('../models/pet.model');
//'CastError' es para manejar errores recibidos de la bd
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')

//ADMIN FUNCTIONS------------------------------------------------------------------------------
async function getPets(req,res){
    try {
        let pets = await Pet.find({state:'activo'}).select('_id details.name details.gender details.health specie owner').populate({path:'owner', select:'name lastName'});
        return res.status(200).json({pets});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado :${error.message}`});
    }
}

async function getIdPet(req,res){
    try {
        const {id} = req.params;
        let pet = await Pet.findOne({_id:id, state:'activo'})
        .populate({path:'owner', select:'_id name lastName phone image'});

        return !pet 
        ? res.status(404).json({message:"Mascota no encontrada"})
        : res.status(200).json({pet});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID proporcionado es inválido."})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function registerPet(req,res){
    try {
        const {name, breed, age, gender,health, weight, specie, ownerId} = req.body;

        const newPet = new Pet({
            details: {
                name,
                breed,
                age,
                health,
                gender,
                weight,
            },
            specie: specie,
            owner: ownerId
        });
        
        if(req.file){
            const {filename} = req.file;
            newPet.setimgurl(filename);
        }

        await newPet.save();

        return res.status(201).json({success:'Mascota Registrada Exitosamente'});
    } catch (error) {
        return res.status(500).json({error:`Ocurrió un error al registrar la mascota, error: ${error.message}`});
    }
}

async function updatePet(req, res) {
    try {
        const {name, breed, age, gender,health, weight, specie, ownerId} = req.body;
        const {id} = req.params;//datos
        //verificamos existencia
        let pet  = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({message:'No se encontró la mascota'});
        }
        //variable global para la imagen anterior
        let urlfotoanterior;
        //actualizamos
         await Pet.findByIdAndUpdate(
            id,
            {
                $set: {
                    'details.name': name,
                    'details.breed': breed,
                    'details.age': age,
                    'details.health':health,
                    'details.gender': gender,
                    'details.weight': weight,
                    species: specie,
                    owner: ownerId
                }
            },
            { new: true }
        );
        //verificamos la existencia de atributo image
        if (pet.details.image) {
            urlfotoanterior = pet.details.image.split("/");
        }

        //si un arquivo exite en el req entonces:
        if (req.file) {
            const { filename } = req.file;
            pet.setimgurl(filename);
            //se guarda la imagen con la nueva ruta
            await pet.save();

            //si el file name coincide con la imagen acual manda la respuesta y mantiene la imagen anterior
            if(urlfotoanterior && urlfotoanterior[4] === filename ){
                return res.status(200).json({success:'Mascota Actualizada'});
            }
            //en caso de ser diferente eliminara la imagen antigua y dejara la nueva
            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/pet/' + urlfotoanterior[4]))) {
                await fs.unlink(path.join(__dirname, '../public/uploads/pet/' + urlfotoanterior[4]));
            }
        }

        return res.status(200).json({success:'Mascota Actualizada'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de la Mascota proporcionada es inválida"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function deletePet(req,res){
    try {
        const {id} = req.params;
        let pet = await Pet.findOne({_id: id, state:'activo'});

        if(!pet){
            return res.status(404).json({message:'Mascota no encontrada'});
        }

        pet = await Pet.findByIdAndUpdate(id,{state:'inactivo'},{new:true});

        return res.status(200).json({success:'Mascota Eliminada'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de la Mascota proporcionada es inválida"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//OWNER FUNCTIONS--------------------------------------------------------
async function getPetOwnerId(req,res){
    try {
        const {id} = req.params;
        let pets = await Pet.find({owner:id , state:'activo'});
        return res.status(200).json({pets});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Dueño proporcionado es inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getPets,
    getIdPet,
    registerPet,
    updatePet,
    deletePet,
    //owner function to the owner endpoins
    getPetOwnerId
}