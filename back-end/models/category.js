const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        default:null
    },
    isTrash:{
        type:Boolean,
        default:false
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

const categoryModal = mongoose.model('category',categorySchema)
module.exports = categoryModal