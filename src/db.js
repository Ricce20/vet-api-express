//IMPORTS ----------------
const mongoose = require('mongoose')
//CONECTION
const conectionDB = async()=>{
    try {
        await mongoose.connect(process.env.P_MONGO_URL);
        console.log('DB is Conected');
    } catch (error) {
        console.log(error.message);
    }
}

const close = async ()=>{
    try {
        mongoose.disconnect();
        console.log('Conexion cerrada');
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    conectionDB,
    close
}
