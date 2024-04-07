const Post = require('../models/post.model');
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')

async function getPost(req,res){
    try {
        let posts = await Post.find().sort({date: -1});

        posts.forEach(post=>{
            post.toJSON = function(){
                return{
                    ...this.toObject(),
                    date:this.date.toLocaleDateString('es-ES',{
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric',
                        hour:'numeric',
                       minute:'numeric'
                    })
                }
            }
        })
        return res.status(200).json({posts});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

async function getIdPost(req,res){
    try {
        const {id} = req.params;
        let post = await Post.findById(id);

        post.toJSON = function(){
            return{
                ...this.toObject(),
                date:this.date.toLocaleDateString('es-ES',{
                    day:'2-digit',
                    month:'2-digit',
                    year:'numeric',
                    hour:'numeric',
                    minute:'numeric'
                })
            }
        }

        return !post
        ? res.status(404).json({message:'Post no encontrado'})
        : res.status(200).json({post});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID proporcionado es inválido."})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
     
    }
}

async function registerPost(req,res){
    try {
        const {title,description} = req.body;

        let newPost = new Post({
            title,
            description
        });

        if(req.file){
            const {filename} = req.file;
            newPost.setimgurl(filename);
        }
        await newPost.save();

        return res.status(201).json({success:'Post Publicado'});

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

async function updatePost(req,res){
    try {
        const {id} = req.params;
        const {title,description} = req.body;
        let urlfotoanterior;

        let post  = await Post.findById(id);

        if(!post){
            return res.status(404).json({message:'Post no encontrado'});
        }

        await Post.findByIdAndUpdate(id,
            {
                title,
                description
            },
            {new:true}
        );

        if (post.image) {
            urlfotoanterior = post.image.split("/");
        }

        //si un arquivo exite en el req entonces:
        if (req.file) {
            const { filename } = req.file;
            post.setimgurl(filename);
            //se guarda la imagen con la nueva ruta
            await post.save();

            //si el file name coincide con la imagen acual manda la respuesta y mantiene la imagen anterior
            if(urlfotoanterior && urlfotoanterior[4] === filename ){
                return res.status(200).json({success:'Post Actualizado'});
            }
            //en caso de ser diferente eliminara la imagen antigua y dejara la nueva
            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/post/' + urlfotoanterior[4]))) {
                await fs.unlink(path.join(__dirname, '../public/uploads/post/' + urlfotoanterior[4]));
            }
        }

        return res.status(200).json({success:'Post actualizado'});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID proporcionado es inválido."})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    
    }
}

async function deletePost(req,res){
    try {
        const {id} = req.params;
        let post = await  Post.findById(id);
        
        if(!post){
            return res.status(404).json({message:'Post no encontrado'});
        }

        await Post.findOneAndDelete(id);
        return res.status(200).json({success:'Post eliminado'});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID proporcionado es inválido."})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    
    }
}

module.exports = {
    deletePost,
    getIdPost,
    getPost,
    registerPost,
    updatePost
}