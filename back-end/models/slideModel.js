const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideSchema = new Schema({
    image:{
        type:String,
        default:null
    },
    serial:{
        type:Number,
        default:0
    }
})

const slideModel = mongoose.model('slideimage',slideSchema)
module.exports = slideModel