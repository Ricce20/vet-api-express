//IMPORTS
const {z} = require('zod');

//EMPLOYEEE ESCHEMA VALIDATION
const registerEmployeeSchema = z.object({
    email: z.string().email({message:"Email inválido" }),
    password: z.string().min(8, {message:"La contraseña debe tener al menos 8 caracteres"}).nonempty({message:"Campo Password Esta Vacio"}),
    name: z.string({required_error:'Campo Nombre Es Requerido'}).nonempty({message:'Campo Nombre Esta Vacio'}),
    lastName: z.string({required_error:'Campo lastName Es Requerido'}).nonempty({message:'Campo lastName Esta Vacio'}),
    phone: z.string().max(10, { message: "El número de teléfono no debe tener más de 10 caracteres" }).nonempty({message:"Campo Telefono Esta Vacio"}),
    type: z.enum(['vet','admin','assistant','receptionist']) // Definición del enum
});


// OWNER SCHEMA VALIDATION
const registerOwnerSchema = z.object({
    email: z.string().email({ message: "Email Es Inválido"}),
    name: z.string({required_error:'Campo nombre Es Requerido'}).nonempty({message:'Campo Nombre Esta Vacio'}),
    lastName: z.string({required_error:'El Campo lastName Es Reqierido'}).nonempty({message:'El campo lastName Esta Vacio'}),
    phone: z.string({required_error:'El Campo phone Es Requerido'}).max(10, { message: "El número de teléfono no debe tener más de 10 caracteres" }).nonempty({message:'El campo phone Esta Vacio'}),
});

// USER UPDATE SCHEMA VALIDATION
const updateUserSchema = z.object({
    password: z.string().min(8, {message:"La contraseña debe tener al menos 8 caracteres"}).nonempty({message:"Campo Password Esta Vacio"})
});

module.exports = {
    registerEmployeeSchema,
    registerOwnerSchema,
    updateUserSchema
}