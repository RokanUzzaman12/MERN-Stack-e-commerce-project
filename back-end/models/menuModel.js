const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    title:{
        type:String,
        default:null,
    },

    order:{
        type:Number,
        default:0
    },
    subNav:[ 
        {
            type:Schema.Types.ObjectId,
            ref:'permission'
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

const menuModel = mongoose.model('menu',menuSchema)
module.exports = menuModel

