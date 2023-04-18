const products = require("../../productsDetails")
const slugify = require('slugify')

const productModel = require('../../models/product') 






// exports.fetchAllProducts = (req,res,next)=>{
//     console.log(req.userInfo)
//     res.status(200).send({
//         type:"success",
//         msg:'Data fetched fuccessfully',
//         data:products
//     })
// }

exports.fetchAllProducts = (async(req,res,next)=>{
    try{

        let products = await productModel.find()
        res.status(200).send({
            type:'success',
            msg:'Data fetched successfully',
            data:products
        })

    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
})

exports.fetchSingleProductById = (async(req,res,next)=>{
    try{

        let productId = req.params.id
        let result = await productModel.findById(productId)
        return res.status(200).send({
            type:'success',
            msg:'Data fetch successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        return res.status(500).send('server error')
    }
})




exports.addNewProduct = (async(req,res,next)=>{
    try{
        const {name,description,price} = req.body
        console.log(req.body)
        let image = ''
        if(req.file){
            image = req.file.filename
        }else{
            image = ''
        }

        let slug = slugify(name,{lower:true})
        let chectSlug = await productModel.find({slug:slug})
        if(chectSlug.length>0){
            slug = slugify(name,{lower:true})+'-'+Math.floor(Math.random()*10000)
        }
        
        let addProduct = new productModel({
            name,
            description,
            price,
            image,
            slug
        })
        await addProduct.save()

        let result = await productModel.findById(addProduct._id)
        res.status(200).send({
            type:'success',
            msg:'Product Added Successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.updateProduct = (async(req,res,next)=>{
    try{
        let id = req.params.id
        const {name,description,price} = req.body
        
        let singleProduct = await productModel.findById(id)

        let image = ''
        if(req.file){
            image = req.file.filename
        }else{
            console.log(req.file)
            image = singleProduct.image
        }

        singleProduct.name = name
        singleProduct.description = description
        singleProduct.image = image
        singleProduct.price = price
        await singleProduct.save()

        let result = await productModel.findById(id)

        return res.status(200).send({
            type:'success',
            msg:'Product Updated Successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

exports.deleteProduct = (async(req,res,next)=>{
    try{
        let id = req.params.id
        let removeProduct = await productModel.findById(id)
        if(removeProduct){
            // console.log('it is working')
            await removeProduct.remove()
        }
        return res.status(200).send({
            type:'success',
            msg:'Product Removed Successfully'
        })

    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
})