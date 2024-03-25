//IMPORTS
const {z} = require('zod');

//SCHEMAS
const R_productSchema = z.object({
    product: z.string({required_error:"es requerido este campo product"}).nonempty({message:'Campo producto Esta Vacio'}),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}),
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message:'Campo price Esta Vacio'}),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).nonempty({message:'Campo quantity Esta vacio'}),
    image: z.string({required_error:'Imagen esta vacio'}).optional(),
    image2: z.string({required_error:'campo imagen 2 es requerido'}).optional(),
    category:z.enum(['Alimento', 'Higiene','Ropa', 'Accesorios', 'Juguetes']),
    specie: z.enum(['Felinos','Caninos','Rodores','Aves'])
});

const U_productSchema = z.object({
    product: z.string({required_error:"es requerido este campo name"}).optional(),
    description:z.string({required_error: "Es requerido el campo descripcion"}).optional(),
    price: z.string({required_error:"Es requerido el campo precio"}).optional(),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).optional(),
    image: z.string({required_error:'Imagen esta vacio'}).optional(),
    image2: z.string({required_error:'campo imagen 2 es requerido'}).optional(),
    category:z.enum(['Alimento', 'Higiene','Ropa', 'Accesorios', 'Juguetes']).optional(),
    specie: z.enum(['Felinos','Caninos','Rodores','Aves'])
});

const R_productEntrySchema = z.object({
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message:'Campo price Esta Vacio'}),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).nonempty({message:'Campo quantity Esta vacio'}),
});

module.exports = {
    R_productSchema,
    U_productSchema,
    R_productEntrySchema
}