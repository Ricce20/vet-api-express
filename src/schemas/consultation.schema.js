const {z} = requiere('zod');

const registerConsultSchema = z.object({
    vetId: z.string({required_error: 'campo vetId vacio'}).nonempty({message:'Campo vetId Esta Vacio'}),
    petId: z.string({required_error:'campo petId vacio'}),
    nameVet: z.string({required_error:'campo nameVet vacio'}),
    observations: z.string({required_error:'campo observations vacio'}).nonempty({message:'campo observations vacio'}).optional(),
    signs: z.string({required_error:'campo signs vacio'}).nonempty({message:'campo signs vacio'}).optional(),
    treatment: z.string({required_error:'campo treatment vacio'}).nonempty({message:'campo treatment vacio'}).optional(),
    diagnosis: z.string({required_error:'campo diagnosis vacio'}).nonempty({message:'campo diagnosis vacio'}),
});

const updateConsultSchema = z.object({
    vetId: z.string({required_error: 'campo vetId vacio'}).nonempty({message:'Campo vetId Esta Vacio'}).optional(),
    nameVet: z.string({required_error:'campo nameVet vacio'}).optional(),
    observations: z.string({required_error:'campo observations vacio'}).nonempty({message:'campo observations vacio'}).optional(),
    signs: z.string({required_error:'campo signs vacio'}).nonempty({message:'campo signs vacio'}).optional(),
    treatment: z.string({required_error:'campo treatment vacio'}).nonempty({message:'campo treatment vacio'}).optional(),
    diagnosis: z.string({required_error:'campo diagnosis vacio'}).nonempty({message:'campo diagnosis vacio'}),
});

module.exports ={
    registerConsultSchema,
    updateConsultSchema
}