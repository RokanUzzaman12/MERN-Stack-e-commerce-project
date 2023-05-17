const roleModel = require('../../models/roleModel')

exports.addNewRole = (async(req,res,next)=>{
    try{
        const {name,menu} = req.body
        const addRole = new roleModel({
            name,
            menu
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