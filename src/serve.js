//IMPORTS-----------------------
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors =  require('cors');

//IMPORTS-ROUTES
const UserRoute = require('./routes/usersRegister.routes');
const AuthRoute = require('./routes/Auth.routes');
const VetRouter = require('./routes/vet.routes');
const OwnerRouter = require('./routes/owner.routes');

//inicializacion-app
const app = express();

//PORT
const PORT = process.env.PORT || process.env.P_PORT;
app.set('PORT',PORT);

//ROUTES ACCESS IMAGES PUBLIC
app.use('/foto-emp',express.static(path.join(__dirname,'/public/uploads/employees/')));
app.use('/foto-own',express.static(path.join(__dirname,'/public/uploads/owner/')));
app.use('/foto-pet',express.static(path.join(__dirname,'/public/uploads/pet/')));
app.use('/foto-prod',express.static(path.join(__dirname,'/public/uploads/product/')));
app.use('/foto-medical',express.static(path.join(__dirname,'/public/uploads/medical/')));
app.use('/foto-post',express.static(path.join(__dirname,'/public/uploads/post/')));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://vet-api-express.onrender.com", "http://localhost:4200"],
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"]
}));



//ROUTES-USE
app.get('/',(req,res)=>{
    res.send('Bienvenido al servidor');
})
app.use('/user',UserRoute);
app.use('/auth',AuthRoute);
app.use('/vet',VetRouter);
app.use('/owner',OwnerRouter);


//EXPORTAMOS 
module.exports = app;
