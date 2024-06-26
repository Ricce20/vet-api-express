const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    image:{
        type:String
    }
});

//METHODS
postSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "https://vet-api-express.onrender.com/foto-post/" + imagen;
}

module.exports = mongoose.model('Post',postSchema);