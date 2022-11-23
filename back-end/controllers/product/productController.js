
exports.fetchAllProducts = (req,res,next)=>{
    res.status(200).send({
        type:"success",
        msg:'Data fetched fuccessfully',
        data:["test","test2", "test3"]
    })
}