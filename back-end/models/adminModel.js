const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const adminSchema = new Schema({
    firstName:{
        type:String,
        default:null
    },
    lastName:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'role'
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

adminSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const adminModel = mongoose.model('admin',adminSchema)

module.exports = adminModel