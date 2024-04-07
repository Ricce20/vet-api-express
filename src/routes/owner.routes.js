//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE

//SCHEMAS

//CONTROLLERS
const {getPetOwnerId, getIdPetForOwner} = require('../controllers/pet.controller');
const {getProducts,getIdProduct} = require('../controllers/product.controller');
const {getServicesActived} = require('../controllers/service.controller');
const { getIdOwner } = require('../controllers/owner.controller');
const consultC = require('../controllers/consultation.controller');
const medHC = require('../controllers/medicalHistory.controller');
const saleC = require('../controllers/sales.controller');

//LIBS-images

//routes
router.get('/my/:id',auntentifica,getIdOwner);//user
//------------------------------------pets
router.get('/myPets/:id',auntentifica,getPetOwnerId);
router.get('/pet/:id',auntentifica,getIdPetForOwner);
router.get('/consultPet/:id',auntentifica,consultC.getConsultForPetId);
router.get('/medical_history/:id',auntentifica,medHC.getMedicalH_PetId);
router.get('/my_tickects/:id',auntentifica,saleC.getSalesForOwnerId)
//--------------------------------------products
router.get('/product',auntentifica,getProducts);
router.get('/product/:id',auntentifica,getIdProduct);
//-------------------------------------services
router.get('/services',auntentifica,getServicesActived);

module.exports = router;