//IMPORTS
const {Router} = require('express');
const router = Router();
//VALIDATIONS
const {loginSchema} = require('../schemas/auth.schema');
//MIDDLEWARES
const { validateSchema } = require('../middlewares/validator.middleware');
//CONTROLLERS
const {login,loginEmployee,loginOwner} = require('../controllers/Auth.controller');
//LIBS
const {uploadEmployee} = require('../libs/ImagesUpload');

//LOGINS
router.post('/login',uploadEmployee.none(),validateSchema(loginSchema),login);
router.get('/loginEmp/:id',loginEmployee);
router.get('/loginOwn/:id',loginOwner);





module.exports = router;