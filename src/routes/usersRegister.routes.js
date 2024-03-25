//IMPORTS
const {Router} = require('express');
const router = Router();
//MIDDLEWARE
const {validateSchema} = require('../middlewares/validator.middleware');
const auntentifica = require('../middlewares/autentificajwt');
//VALIDATIONS
const {registerEmployeeSchema,registerOwnerSchema} =require('../schemas/register.schema');
//CONTROLLERS
const registerC = require('../controllers/UserRegister.controller');
//LIBS
const {uploadEmployee,uploadOwner} = require('../libs/ImagesUpload');
//---------------------------------------------------------------------------------------------

//register
router.post('/register-employee',auntentifica,uploadEmployee.single('image'),validateSchema(registerEmployeeSchema),registerC.RegisterEmployee);//register user with employee
router.post('/register-owner',auntentifica,uploadOwner.single('image'),validateSchema(registerOwnerSchema),registerC.RegisterOwner);//register user with owner

module.exports =router;