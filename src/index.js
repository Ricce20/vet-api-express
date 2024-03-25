//IMPORTS----------------
require('dotenv').config();
const app = require('./serve');
const {conectionDB,close} = require('./db');

//INICIALIZACION DE LA BASE DE DATOS
conectionDB();

//INICIAR ESCUCHA DEL PUERTO PARA EL SERVIDOR
app.listen(app.get('PORT'),()=>{
    console.log(`LISTENING ON PORT ${app.get('PORT')}`)
});