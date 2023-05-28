const jwt = require('jsonwebtoken')
const ErrorResponse = require('./customError')
const roleModel = require('../models/roleModel')
exports.checkLogin = async(req,res,next)=>{

    try{
        const {authorization} = req.headers
        
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
        console.log(req.userInfo)
        let role = await roleModel.findOne({name:req.userInfo.role})
        .select('givenPermission')
        .populate({path:'givenPermission'})
        
        let permission = []
        
            role.givenPermission.map((p)=>{
                permission.push(p.subNavTitle.toUpperCase())
            })
     
            let hasPermission = permission.includes(data.toUpperCase())
            if(hasPermission){
                next()
            }else{
               new ErrorResponse('You have not this permission',403)
            }
        
        
    }

}

exports.verifyEveryTime = async(req,res,next)=>{
    try{
        const {authorization} = req.headers
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