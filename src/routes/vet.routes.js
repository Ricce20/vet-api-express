//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES--auth
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE---
const {validateSchema} = require('../middlewares/validator.middleware');
//SCHEMAS----
const {updateUserSchema} = require('../schemas/register.schema');
const {updateOwnerSchema} = require('../schemas/owner.schema');
const {updateEmployeeSchema} = require('../schemas/employee.schema');
const {registerPetSchema,updatePetSchema} =require('../schemas/pet.schema');
const {R_productSchema,U_productSchema,R_productEntrySchema} = require('../schemas/product.schema');
const {R_serviceSchema,U_serviceSchema} = require('../schemas/service.schema');
const {R_medicationSchema,U_medicationSchema,R_medicationEntrySchema} = require('../schemas/medication.schema');
const {registerPostSchema,updatePostSchema} = require('../schemas/post.schema');
const {registerMHSchema,updateMHSchema} = require('../schemas/medicalHistory.schema');
const {salesRegisterSchema} = require('../schemas/sales.schema');
//CONTROLLERS---
const userC = require('../controllers/User.controller')
const empC = require('../controllers/Employee.controller');
const ownC = require('../controllers/owner.controller');
const petC = require('../controllers/pet.controller');
const prodC = require('../controllers/product.controller');
const servC = require('../controllers/service.controller');
const medC = require('../controllers/medication.controller');
const postC = require('../controllers/post.controller');
const consultC = require('../controllers/consultation.controller');
const medHC = require('../controllers/medicalHistory.controller');
const saleC = require('../controllers/sales.controller');
//LIBS-images--
const { uploadPet, uploadProduct,uploadEmployee, uploadOwner,uploadMedical,uploadPost} = require('../libs/ImagesUpload');

//-----------------------------------------------------------------------------------routes

//---------------------------------users
    router.get('/userEmp',auntentifica,userC.getUsers);//exclusivo para admin
    router.get('/user/:id',auntentifica,userC.getIdUser);
    router.put('/user/:id',auntentifica,uploadEmployee.none(),validateSchema(updateUserSchema),userC.updateUser);
    router.delete('/user/:id',auntentifica,userC.deleteUser);
//----------------------------------employees

    router.get('/employee',auntentifica,empC.getEmployees);
    router.get('/employee/:id',auntentifica,empC.getIdEmployee);
    router.put('/employee/:id',auntentifica,uploadEmployee.single('image'),validateSchema(updateEmployeeSchema),empC.updateEmployee);
    router.delete('/employee/:id',auntentifica,empC.deleteEmployee);

//---------------------------------owner

    router.get('/owner',auntentifica,ownC.getOwners);
    router.get('/owner/:id',auntentifica,ownC.getIdOwner);
    router.put('/owner/:id',auntentifica,uploadOwner.single('image'),validateSchema(updateOwnerSchema),ownC.updateOwner);
    router.delete('/owner/:id',auntentifica,ownC.deleteOwner);

//------------------------------------pets

    router.get('/pet',auntentifica,petC.getPets);
    router.get('/pet/:id',auntentifica,petC.getIdPet);
    router.post('/pet',uploadPet.single('image'),validateSchema(registerPetSchema),petC.registerPet);
    router.put('/pet/:id',auntentifica,uploadPet.single('image'),validateSchema(updatePetSchema),petC.updatePet);
    router.delete('/pet/:id',auntentifica,petC.deletePet);

//-------------------------------------products

    router.get('/product',auntentifica,prodC.getProducts);
    router.get('/product/:id',auntentifica,prodC.getIdProduct);
    router.post('/product',auntentifica,uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(R_productSchema),prodC.registerProduct);
    router.put('/product/:id',auntentifica,uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(U_productSchema),prodC.updateProduct);
    router.delete('/product/:id',auntentifica,prodC.deleteProduct);
    //entries-product
    router.post('/product/entry/:id',auntentifica,uploadProduct.none(),validateSchema(R_productEntrySchema),prodC.productEntries);
    router.get('/product-entries',auntentifica,prodC.getEntries);

//----------------------------------services

    router.get('/service',auntentifica,servC.getServices);
    router.get('/service/:id',auntentifica,servC.IdGetService);
    router.post('/service',auntentifica,uploadProduct.none(),validateSchema(R_serviceSchema),servC.createService);
    router.put('/service/:id',auntentifica,uploadProduct.none(),validateSchema(U_serviceSchema),servC.updateService);
    router.delete('/service/:id',auntentifica,servC.deleteService);

//---------------------------------------------medications

    router.get('/medication',auntentifica,medC.getMedicines);
    router.get('/medication/:id',auntentifica,medC.getIdMedicine);
    router.post('/medication',auntentifica,uploadMedical.single('image'),validateSchema(R_medicationSchema),medC.registerMedicine);
    router.put('/medication/:id',auntentifica,uploadMedical.single('image'),validateSchema(U_medicationSchema),medC.updateMedicine);
    router.delete('/medication/:id',auntentifica,medC.deleteMedicine);
    //entry-medication
    router.post('/medication/entry/:id',auntentifica,uploadMedical.none(),validateSchema(R_medicationEntrySchema),medC.entryMedications);
    router.get('/medication-entries',medC.getEntryMedications);


    //-----------------------------------------post
    router.get('/post',auntentifica,postC.getPost);
    router.get('/post/:id',auntentifica,postC.getIdPost);
    router.post('/post',auntentifica,uploadPost.single('image'),validateSchema(registerPostSchema), postC.registerPost);
    router.put('/post/:id',auntentifica,uploadPost.single('image'),validateSchema(updatePostSchema),postC.updatePost);
    router.delete('/post/:id',auntentifica,postC.deletePost)

    //----------------------------------------Consultations
    router.get('/consult',auntentifica,consultC.getConsults);
    router.get('/consult/:id',auntentifica,consultC.getIdConsult);
    router.post('/consult',auntentifica,consultC.registerConsult);
    router.put('/consult/:id',auntentifica,consultC.editConsult);
    router.get('/consult/pet/:id', auntentifica, consultC.getConsultForPetId);
    //------------------------------------------Medical History
    router.get('/medical_history',auntentifica,medHC.getMedicalHostories);
    router.get('/medical_history/:id',auntentifica,medHC.getIdHistory);
    router.post('/medical_history',auntentifica,validateSchema(registerMHSchema),medHC.registerHistory);
    router.put('/medical_history/:id',auntentifica,validateSchema(updateMHSchema),medHC.editHistory);
    router.delete('/medical_history/:id',auntentifica,medHC.deleteHistory);
    router.get('/medical_history/pet/:id', auntentifica, medHC.getMedicalH_PetId);
    //-------------------------------------------Sales
    router.get('/sale',auntentifica,saleC.getSales);
    router.get('/sale/:id',auntentifica,saleC.getIdSale);
    router.post('/sale',auntentifica,validateSchema(salesRegisterSchema),saleC.registerSale);
    router.delete('/sale/:id',auntentifica,saleC.deleteSaleId);

module.exports = router;