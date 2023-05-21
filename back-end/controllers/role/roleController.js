const roleModel = require('../../models/roleModel')
const menuModel = require('../../models/menuModel')
exports.addNewRole = (async(req,res,next)=>{
    try{
        const {name,menu} = req.body
        let permission = []
        let permissionPromise =  menu.map(async(item)=>{
            let menuById = await menuModel.findById(item._id)
            permission.push(...menuById.subNav)
            // console.log(...menuById.subNav)
        })

        await Promise.all(permissionPromise)
        console.log(permission)

        const addRole = new roleModel({
            name,
            menu,
            permission
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