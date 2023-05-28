const adminModel = require('../../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createAdmin = (async(req,res,next)=>{
    try{
        
        const {firstName,lastName,email,password} = req.body

        const addNewAdmin = new adminModel({
            firstName,
            lastName,
            email,
            password
        })

        await addNewAdmin.save()

        res.status(200).send({
            type:'success',
            msg:'Admin Added Successfully',
            data:addNewAdmin
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.fetchAllAdmin = (async(req,res,next)=>{
    try{
        let result = await adminModel.find()
        .populate({path:'role'})
        .sort({create:-1})
        res.status(200).send({
            type:'success',
            msg:'Data Fetched Successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.logIn = (async(req,res,next)=>{
    try{

        const {email,password} = req.body
        const adminInfo = await adminModel.findOne({email:email})
        .populate({path:'role'})
        console.log(adminInfo)
        bcrypt.compare(password, adminInfo.password, function(err, result) {
            if(result){
                let token = jwt.sign({
                    email:adminInfo.email,
                    firstName:adminInfo.firstName,
                    lastName:adminInfo.lastName,
                    role:adminInfo.role.name,
                    test:'tee'
                },
                'secrate-key',
                {
                    expiresIn:'1h'
                }
                )

                return res.status(200).send({
                    type:'success',
                    msg:`${adminInfo.firstName} Your are Successfully Loged In`,
                    token:token,
                    data:adminInfo
                })
                
            }else{
                 
                return res.status(400).send({
                    type:'passwordNotMatch',
                    msg:'Your password is incorrect'
                })
                
            }
        });

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

exports.updateRole = (async(req,res,next)=>{
    try{
        let adminId = req.params.id
        const {firstName,email,role} = req.body

        let editRole = await adminModel.findById(adminId)
        editRole.firstName = firstName
        editRole.email = email
        editRole.role = role

        await editRole.save()

        let result = await adminModel.findById(adminId)
        .populate({path:'role'})

        res.status(200).send({
            type:'success',
            msg:'Data updated successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})