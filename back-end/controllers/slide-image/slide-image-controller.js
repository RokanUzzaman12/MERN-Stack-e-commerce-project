const slideModel = require('../../models/slideModel')
exports.addSlideImage = (async(req,res,next)=>{
    try{
        res.status(200).send({
            type:'Success',
            msg:'Data Added successfully'
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})