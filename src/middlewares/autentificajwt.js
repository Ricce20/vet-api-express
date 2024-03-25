const jwt = require('jsonwebtoken');
function auntentifica(req,res,next) {
    const jwtoken = req.header('Authorization');
    if(!jwtoken){
        return res.status(401).send('Acceso denegado, Necesitas un token');

    }
    try {
        const payload = jwt.verify(jwtoken,process.env.P_SECRET_TOKEN);
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).json({message:'Acceso denegado, Token no valido'});
    }
}   

module.exports = auntentifica