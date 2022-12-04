const jwt = require('jsonwebtoken')
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