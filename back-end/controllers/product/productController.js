const products = require("../../productsDetails")
exports.fetchAllProducts = (req,res,next)=>{
    console.log(req.userInfo)
    res.status(200).send({
        type:"success",
        msg:'Data fetched fuccessfully',
        data:products
    })
}