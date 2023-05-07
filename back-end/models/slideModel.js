const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideSchema = new Schema({
    title:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    order:{
        type:Number,
        default:0
    }
})

const slideModel = mongoose.model('slideimage',slideSchema)
module.exports = slideModel