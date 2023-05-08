const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        default:null,
    },

    description:{
        type:String,
        dafault:null
    },

    price:{
        type:Number,
        dafault:0
    },

    image:{
        type:String,
        default:null
    },

    slug:{
        type:String,
        default:null
    },
    
    brand:{
        type:String,
        default:''
    },
    update:{
        type:Date,
        default:null
    },
    create:{
        type:Date,
        default: new Date
    }

    
})

const productModel = mongoose.model('product',productSchema)
module.exports = productModel

