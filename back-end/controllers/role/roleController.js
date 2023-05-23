const roleModel = require('../../models/roleModel')
const menuModel = require('../../models/menuModel')
exports.addNewRole = (async(req,res,next)=>{
    try{
        const {name,menu,givenPermission} = req.body
        let permission = []
        let permissionPromise =  menu.map(async(item)=>{
            let menuById = await menuModel.findById(item._id)
            permission.push(...menuById.subNav)
            // console.log(...menuById.subNav)
        })

        await Promise.all(permissionPromise)
        

        const addRole = new roleModel({
            name,
            menu,
            permission,
            givenPermission
        })



        await addRole.save()
        res.status(200).send({
            type:'success',
            msg:'Role Added Successfully',
            data:addRole
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Servr Error")
    }
})

exports.fetchAllRole = (async(req,res,next)=>{
    try{
        const result = await roleModel.find()
        .populate({path:'menu',populate:{path:'subNav'}})
        .populate({path:'permission'})
        .populate({path:'givenPermission'})

        res.status(200).send({
            type:'success',
            msg:'Data Fetch Successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.updateRole = (async(req,res,next)=>{
    try{
        let roleId = req.params.id
        const {permission,givenPermission,menu} = req.body
        // permission.push({...menu.subNav})
        // console.log(...menu)
        let selectedRole = await roleModel.findById(roleId)
        
        selectedRole.permission = permission
        selectedRole.givenPermission = givenPermission
        selectedRole.menu = menu

        await selectedRole.save()
        
        let result = await roleModel.findById(roleId)
        res.status(200).send({
            type:'success',
            msg:'Data Updated Successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.fetchByUserRole = (async(req,res,next)=>{
    try{
        let processedData = []
        let result = await roleModel.findOne({name:'Admin'})
        .populate({path:'menu'})
        .populate({path:'givenPermission'})

        result.menu.map((item)=>{
            processedData.push({_id:item._id,title:item.title,subNav:[],rightIcon:"fa-solid fa-chevron-right nav-icon"})
        })

        result.menu.map((item)=>{
            result.givenPermission.map((p)=>{
                if(p.navId.toString() === item._id.toString()){
                    let processIndex = processedData.findIndex((pr)=>pr._id.toString() === p.navId.toString())
                    processedData[processIndex].subNav.push(p)
                }
            })
            
        })


        console.log(processedData)
        


        res.status(200).send({
            type:'success',
            msg:"Data fetched successfully",
            data:processedData
        })

    }catch(err){
        res.status(500).send({
            type:'success',
            msg:'Data fetched successfully'
        })
    }
})

exports.deleteRole = (async(req,res,next)=>{
    try{

        let roleId = req.params.id
        let selectedRole = await roleModel.findById(roleId)
        await selectedRole.remove()
        res.status(200).send({
            type:'success',
            msg:'Role Deleted Successfully',
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})