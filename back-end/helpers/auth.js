const jwt = require('jsonwebtoken')
const ErrorResponse = require('./customError')
const roleModel = require('../models/roleModel')
exports.checkLogin = async(req,res,next)=>{

    try{
        const {authorization} = req.headers
        console.log(authorization) 
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token,'secrate-key')
        req.userInfo = decoded

        next()
    }catch(err){
        console.log('err')
        return res.status(403).send({
            type:'tokenError',
            msg:'Please login again'
        })
    }
}

exports.checkAdminPermission = async(req,res,next)=>{

    try{
        
        const {adminauthorization} = req.headers
        const token = adminauthorization.split(' ')[1]
        const decoded = jwt.verify(token,'secrate-key')
        req.userInfo = decoded
        next()
    }catch(err){
        console.log('err')
        return res.status(403).send({
            type:'tokenError',
            msg:'Please login again'
        })
    }
}


exports.checkPermission = (data)=>{

    return async(req,res,next)=>{
        console.log(data)
        let role = await roleModel.find()
        .select('givenPermission')
        .populate({path:'givenPermission'})
        console.log(role)
        next()
    }

}

exports.verifyEveryTime = async(req,res,next)=>{
    try{
        const {authorization} = req.headers
        console.log(authorization) 
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token,'secrate-key')
        if(decoded){
            return res.status(200).send({
                type:'success',
                msg:'valid token',
                data:decoded
            })
        }else{
            return res.status(400).send({
                type:'notMatch',
                msg:'not valid token',
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            msg:"server error",
            data:err
        })
    }
}
exports.verifyAdminEveryTime = async(req,res,next)=>{
    try{
        const {adminauthorization} = req.headers
        // console.log(adminauthorization)
        const token = adminauthorization.split(' ')[1]
        const decoded = jwt.verify(token,'secrate-key')
        if(decoded){
            return res.status(200).send({
                type:'success',
                msg:'valid token',
                data:decoded
            })
        }else{
            return res.status(400).send({
                type:'notMatch',
                msg:'not valid token',
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            msg:"server error",
            data:err
        })
    }
}