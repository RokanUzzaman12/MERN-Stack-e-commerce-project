const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permissionSchema = new Schema({
    subNavTitle:{
        type:String,
        default:null,
    },

    navId:{
        type:Schema.Types.ObjectId,
        ref:'menu'
    },
    order:{
        type:Number,
        default:0
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

const permissionModel = mongoose.model('permission',permissionSchema)
module.exports = permissionModel

