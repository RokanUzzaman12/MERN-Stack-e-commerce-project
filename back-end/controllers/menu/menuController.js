const menuModel = require('../../models/menuModel')

exports.addNewModal = (async(req,res,next)=>{
    try{

        const {title} = req.body
        let order = 0
        const previousOrder = await menuModel.count()
        console.log(previousOrder)
        
        if(previousOrder){
            order = previousOrder +1
        }

        let addNewMenu = new menuModel({
            title,
            order
        })

        await addNewMenu.save()

        return res.status(200).send({
            type:'success',
            msg:'Data added successfully',
            data:addNewMenu
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

exports.fetchAllMenu = (async(req,res,next)=>{
    try{
        let result = await menuModel.find()
        .sort({order:1})
        return res.status(200).send({
            type:'success',
            msg:'Data fetched successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.deleteMenu = (async(req,res,next)=>{
    try{
        let menuId = req.params.id
        let selectedData = await menuModel.findById(menuId)
        
        

        await selectedData.remove()

        let allMenu = await menuModel.find().sort({order:1})
        let promise = allMenu.map(async(item,index)=>{
            item.order = index

            await item.save()
        })
        await Promise.all(promise)

        res.status(200).send({
            type:'success',
            msg:'Menu Deleted Successfully',
            data:selectedData
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})
