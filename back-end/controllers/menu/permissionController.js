const permissionModel = require('../../models/permissionModel')
const menuModel = require('../../models/menuModel')

exports.addNewPermission = (async(req,res,next)=>{
    try{
        const { subNavTitle, navId, isMenu,routePath } = req.body;
        console.log(req.body)
        const addNew = new permissionModel({
            subNavTitle,
            navId,
            routePath
        })
        // await addNew.save()
        
        const selectedMenu = await menuModel.findById(navId)
        selectedMenu.subNav.push(addNew._id)
        await selectedMenu.save()

        res.status(200).send({
            type:'success',
            msg:"Data added successfully",
            data:addNew
        })
    }catch(err){
        console.log(err);
        res.status(200).send('Server error');
    }
})

exports.fetchAllPermission = (async(req,res,next)=>{
    try{
        let result = await permissionModel.find()
        .populate({path:'navId',select:'title'})
        return res.status(200).send({
            type:'success',
            msg:'Data fetched successfully',
            data: result
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error');
    }
})

exports.deletePermission = (async(req,res,next)=>{
    try{
        const permissionId = req.params.id
        const result = await permissionModel.findById(permissionId);
        await result.remove()
        return res.status(200).send({
            type:'success',
            msg:'Permission deleted successfully'
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.updatePermission = (async(req,res,next)=>{
    try{
        const { subNavTitle, navId, isMenu,routePath } = req.body
        const permissionId = req.params.id
        const selectedInfo = await permissionModel.findById(permissionId)

        selectedInfo.subNavTitle = subNavTitle
        selectedInfo.navId = navId
        selectedInfo.isMenu = isMenu
        selectedInfo.routePath = routePath

        await selectedInfo.save()
        let result = await permissionModel.find()

        res.status(200).send({
            type:'success',
            msg:'Permission Updated Successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})