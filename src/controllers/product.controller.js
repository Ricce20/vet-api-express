//IMPORTS
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')
//MODELS
const Product = require('../models/product.model');
const  ProductEntry = require('../models/productEntries.model');
//----------------------------------------------------------------------
async function getProducts(req,res){
    try {
       let products = await Product.find({state:'activo'}).select('_id product quantity category specie image price description');
       return res.status(200).json({products});  
    } catch (error) {
        return res.status(500).json({error:`Error encontrado ${error.message}`});
    }
}

async function getIdProduct(req,res){
    try {
        const {id} = req.params;

        let product = await Product.findOne({_id:id, state:'activo'});

        if(!product){
            return res.status(404).json({message:'Producto no Encontrado'});
        }

        return res.status(200).json({product});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function registerProduct(req, res) {
    try {
        const { product, description, price, category, quantity, specie } = req.body;

        let newProduct = new Product({
            product,
            description,
            price,
            quantity,
            category,
            specie,
            image:'http://localhost:3000/foto-prod/default.jpg',
            image2:'http://localhost:3000/foto-prod/default.jpg',
        });

        if (req.files && req.files['image']) {
            const { filename } = req.files['image'][0];
            newProduct.setimgurl(filename);
        }
        if (req.files && req.files['image2']) {
            const { filename } = req.files['image2'][0];
            newProduct.setimgurl2(filename);
        }
        

        await newProduct.save();

        return res.status(201).json({ success: 'Producto Guardado' });

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.product) {
            return res.status(400).json({ error: 'Producto ya registrado' });
        }
        return res.status(500).json({ error: `Error encontrado: ${error.message}` });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { product, description, price, category, quantity,  specie } = req.body;
        
        let urlfotoanterior;
        let urlfotoanterior2;

        let produc = await Product.findOne({ _id: id, state: 'activo' });

        if(produc.image && produc.image2){
            urlfotoanterior = produc.image.split("/");
            urlfotoanterior2 = produc.image2.split("/");
        }

        if (!produc) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const updateFields = {
            product,
            description,
            price,
            quantity,
            category,
            specie
        };
        await Product.findByIdAndUpdate(id, updateFields, { new: true });

        //manejo de la imagen 1
        if (req.files && urlfotoanterior && urlfotoanterior2) {

                if(req.files['image']){
                    const { filename } = req.files['image'][0];
                    produc.setimgurl(filename);
                    await produc.save();
                    if(urlfotoanterior && urlfotoanterior[4] === filename){
                        return res.status(200).json({ success: 'Producto actualizado exitosamente' });
                    }

                    if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior[4]))) {
                        await fs.unlink(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior[4]));
                   }
                }

                if(req.files['image2']){
                    const { filename } = req.files['image2'][0];
                    produc.setimgurl2(filename);
                    await produc.save();
                    if(urlfotoanterior2 && urlfotoanterior2[4] === filename){
                        return res.status(200).json({ success: 'Producto actualizado exitosamente' });
                    }

                    if (urlfotoanterior2 && fs.existsSync(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior2[4]))) {
                        await fs.unlink(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior2[4]));
                   }
                }
        }
        return res.status(200).json({ success: 'Producto actualizado exitosamente' });

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function deleteProduct(req,res){
    try {
        const {id} = req.params;
        let product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:'Prodcuto no Encontrado'});
        }

        await Product.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});
        
        return res.status(200).json({success: 'Producto Eliminado'});


    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function productEntries(req,res){
    try {
        const {id} = req.params;
        const {quantity, price,} = req.body;

        let product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:'Producto no Encontrado'});
        }
        let updateQuantity = Number(product.quantity) + Number(quantity);
        let productUp = await Product.findByIdAndUpdate(id,{quantity:updateQuantity},{new:true});

        if(productUp){
            let entry = new ProductEntry({
                product:id,
                quantity,
                price,
                total: quantity * price,
                date: Date.now()
            });

           await entry.save();
        }

        return res.status(200).json({success:'Entrada Registrada'})

        

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function getEntries(req,res){
    try {
        let entries = await ProductEntry.find({});
        return res.status(200).json({entries});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}
module.exports = {
    deleteProduct,
    getProducts,
    getIdProduct,
    registerProduct,
    updateProduct,
    productEntries,
    getEntries
}