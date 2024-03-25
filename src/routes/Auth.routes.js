//IMPORTS
const {Router} = require('express');
const router = Router();
//VALIDATIONS
const {loginSchema} = require('../schemas/auth.schema');
//MIDDLEWARES
const { validateSchema } = require('../middlewares/validator.middleware');
//CONTROLLERS
const loginC = require('../controllers/Auth.controller');

//LOGINS
router.post('/login',validateSchema(loginSchema),loginC.login);
router.get('/loginEmp/:id',loginC.loginEmployee);
router.get('/loginOwn/:id',loginC.loginOwner);

module.exports = router;