//IMPORTS
const {z} = require('zod');

//SCHEMAS
const R_serviceSchema = z.object({
    service: z.string({required_error:"es requerido este campo name"}).nonempty({message: 'Campo service Esta Vacio'}),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}),
    felino: z.object({
            P: z.number(),
            M: z.number(),
            G: z.number()
    }).optional(),
    canino: z.object({
            P: z.number(),
            M: z.number(),
            G: z.number()
    }).optional(),
    category: z.enum(['Estetica', 'Medica'])

});

const U_serviceSchema = z.object({
    service: z.string({required_error:"es requerido este campo name"}).nonempty({message: 'Campo service Esta Vacio'}).optional(),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}).optional(),
    felino: z.object({
            P: z.number(),
            M: z.number(),
            G: z.number()
    }).optional(),
    canino: z.object({
            P: z.number(),
            M: z.number(),
            G: z.number()
    }).optional(),
    category: z.enum(['Estetica', 'Medica']).optional()
    
});

module.exports = {
    R_serviceSchema,
    U_serviceSchema
}