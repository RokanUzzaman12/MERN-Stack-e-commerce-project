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
        bcrypt.compare(password, adminInfo.password, function(err, result) {
            if(result){
                let token = jwt.sign({
                    email:adminInfo.email,
                    firstName:adminInfo.firstName,
                    lastName:adminInfo.lastName
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