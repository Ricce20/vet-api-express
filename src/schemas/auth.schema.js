//IMPORTS
const {z} = require('zod');
//EMPLOYEEE ESCHEMA VALIDATION
const loginSchema = z.object({
    email: z.string({required_error:'Campo email Es Requerido'}).email({message: "Email inválido"}),
    password: z.string({required_error:'Campo password Es Requerido'}).min(8, { message: "La contraseña debe tener al menos 8 caracteres" }).nonempty({message:'Campo password Esta vacio'})
});

module.exports = {
    loginSchema
}
