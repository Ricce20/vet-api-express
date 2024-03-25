const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true     
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true     
    },
    payments:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
        },
        serviceId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
        },
        name:{type:String},
        price:{type:Number, required:true},
        quantity:{type:Number,required:true},
    }],
    total:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Sale',salesSchema)