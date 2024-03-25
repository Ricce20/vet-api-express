const {z} = require('zod');

const registerPostSchema = z.object({
    description: z.string({required_error: 'Campo descripcion requerido'}).nonempty({message:'Campo descripcion vacio'}),
    title: z.string({required_error:"campo title es requerido"}).nonempty({message:'Campo title esta vacio'})
});

const updatePostSchema = z.object({
    description: z.string({required_error: 'Campo descripcion requerido'}).nonempty({message:'Campo descripcion vacio'}).optional(),
    title: z.string({required_error:"campo title es requerido"}).nonempty({message:'Campo title esta vacio'}).optional()
});

module.exports = {
    registerPostSchema,
    updatePostSchema
}