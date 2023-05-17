const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name:{
        type:String,
        default:null
    },
    menu:[
        {
        type:Schema.Types.ObjectId,
        ref:'menu'
        }
    ],
    update:{
        type:Date,
        default:null
    },
    create:{
        type:Date,
        default: new Date
    }

})

const roleModel = mongoose.model('role',roleSchema)
module.exports = roleModel