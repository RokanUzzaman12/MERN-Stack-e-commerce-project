const slideModel = require('../../models/slideModel')

exports.addSlideImage = (async(req,res,next)=>{
    try{
        let image = ''
        if(req.file){
            image = req.file.filename
        }else{
            image = ''
        }
        const {title} = req.body
        let previousData = await slideModel.find()
        let order = previousData.length

        let addNew = new slideModel({
            title,
            image,
            order
        })

        await addNew.save()

        res.status(200).send({
            type:'success',
            msg:'Data Added successfully',
            data:addNew
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.fetchAllImage = (async(req,res,next)=>{
    try{

        const result = await slideModel.find()
        .sort({order:1})

        return res.status(200).send({
            type:'success',
            msg:'Data Fetched Successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        req.status(500).send('Server error')
    }
})

exports.clickUpArrow = (async(req,res,next)=>{
    try{
        const imageId = req.params.id
        let selectedItem = await slideModel.findById(imageId)
        let previousItem = await slideModel.findOne({order:selectedItem.order-1})

        selectedItem.order = selectedItem.order-1
        previousItem.order = previousItem.order+1

        await selectedItem.save()
        await previousItem.save()
        return res.status(200).send({
            type:'success',
            msg:'Updated Successfully',
            data:selectedItem,
            previous:previousItem
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})


exports.clickDownArrow = (async(req,res,next)=>{
    try{
        const imageId = req.params.id
        let selectedItem = await slideModel.findById(imageId)
        let previousItem = await slideModel.findOne({order:selectedItem.order+1})

        selectedItem.order = selectedItem.order+1
        previousItem.order = previousItem.order-1

        await selectedItem.save()
        await previousItem.save()
        return res.status(200).send({
            type:'success',
            msg:'Updated Successfully',
            data:selectedItem,
            previous:previousItem
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.deleteSlideImage = (async(req,res,next)=>{
    try{
        let slideImageId = req.params.id
        let selectedItem = await slideModel.findById(slideImageId)
        res.status(200).send({
            type:'success',
            msg:'Slide Image Deleted Successfully'
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})