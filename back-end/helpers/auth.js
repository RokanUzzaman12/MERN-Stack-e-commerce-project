const jwt = require('jsonwebtoken')
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