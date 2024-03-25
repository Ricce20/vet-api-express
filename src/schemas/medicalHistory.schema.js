const {z} = require('zod');

const registerMHSchema = z.object({
    vetId: z.string({required_error: 'campo vetId vacio'}).nonempty({message:'Campo vetId Esta Vacio'}),
    petId: z.string({required_error:'campo petId vacio'}).nonempty({message:'Campo petId esta vacio'}),
    description:z.string({required_error:'Campo description requerido'}).nonempty({message:'Campo description esta vaci'}),
    category: z.enum(['vacunacion','Desparasitacion','Cirugias','Medicacion','Examen_Medico'])
});

const updateMHSchema = z.object({
    vetId: z.string({required_error: 'campo vetId vacio'}).nonempty({message:'Campo vetId Esta Vacio'}).optional(),
    description:z.string({required_error:'Campo description requerido'}).nonempty({message:'Campo description esta vaci'}).optional(),
    category: z.enum(['vacunacion','Desparasitacion','Cirugias','Medicacion','Examen_Medico']).optional()

});

module.exports ={
    registerMHSchema,
    updateMHSchema
}