const {z} = require('zod');

//SCHEMAS
const R_medicationSchema = z.object({
    medication: z.string({required_error:"Campo medication es requerido"}).nonempty({message:'Campo medication Esta Vacio'}),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}),
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message:'Campo price Esta Vacio'}),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).nonempty({message:'Campo quantity Esta vacio'}),
    image: z.string({required_error:'Imagen esta vacio'}).optional(),
    category:z.enum(['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antiparasitario', 'Antifúngico', 'Antiviral', 'Otro']),
    species: z.array(z.enum['Felinos', 'Caninos', 'Roedores', 'Aves']),
    dosageForm: z.enum(['Tableta', 'Cápsula', 'Líquido', 'Inyección', 'Tópico', 'Gotas', 'Polvo', 'Suspensión', 'Ungüento', 'Gel']),
    dosage: z.string({required_error:'Campo dosage es Requerido'}).nonempty({message:'Campo dosage Esta Vacio'}),
    administrationRoute: z.enum(['Oral', 'Intravenoso', 'Intramuscular', 'Subcutáneo', 'Tópico', 'Rectal', 'Oftálmico', 'Ótico']),
    precautions: z.string({required_error:'Campo precautions es Requerido'}).nonempty({message:'Campo precautions Esta Vacio'}),
    dateExpiry:z.string({required_error:'Campo dateExpiry es Requerido'}).nonempty({message:'Campo dateExpiry Esta Vacio'})

});

const U_medicationSchema = z.object({
    medication: z.string({ required_error: "Campo medication es requerido" }).nonempty({ message: 'Campo medication Esta Vacio' }).optional(),
    description: z.string({ required_error: "Es requerido el campo descripcion" }).nonempty({ message: 'Campo description Esta Vacio' }).optional(),
    price: z.string({ required_error: "Es requerido el campo precio" }).nonempty({ message: 'Campo price Esta Vacio' }).optional(),
    quantity: z.string({ required_error: 'campo cantidad esta vacio' }).nonempty({ message: 'Campo quantity Esta vacio' }).optional(),
    image: z.string({ required_error: 'Imagen esta vacio' }).optional(),
    category:z.enum(['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antiparasitario', 'Antifúngico', 'Antiviral', 'Otro']).optional(),
    species: z.array(z.enum['Felinos', 'Caninos', 'Roedores', 'Aves']).optional(),
    dosageForm: z.enum(['Tableta', 'Cápsula', 'Líquido', 'Inyección', 'Tópico', 'Gotas', 'Polvo', 'Suspensión', 'Ungüento', 'Gel']).optional(),
    dosage: z.string({ required_error: 'Campo dosage es Requerido' }).nonempty({ message: 'Campo dosage Esta Vacio' }).optional(),
    administrationRoute: z.enum(['Oral', 'Intravenoso', 'Intramuscular', 'Subcutáneo', 'Tópico', 'Rectal', 'Oftálmico', 'Ótico']).optional(),
    precautions: z.string({ required_error: 'Campo precautions es Requerido' }).nonempty({ message: 'Campo precautions Esta Vacio' }).optional(),
    dateExpiry: z.string({ required_error: 'Campo dateExpiry es Requerido' }).nonempty({ message: 'Campo dateExpiry Esta Vacio' }).optional()
});

//SCHEMAS
const R_medicationEntrySchema = z.object({
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message:'Campo price Esta Vacio'}),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).nonempty({message:'Campo quantity Esta vacio'}),
});
module.exports = {
    R_medicationSchema,
    U_medicationSchema,
    R_medicationEntrySchema
}