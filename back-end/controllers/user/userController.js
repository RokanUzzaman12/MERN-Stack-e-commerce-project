const userModel = require('../../models/Users')
const hashPassword = require('../../helpers/hashPassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async(req,res,next)=>{
    try{

        const {firstName,lastName,email,password} = req.body

        const addUser = new userModel({
            firstName,
            lastName,
            email,
            password
        })
        await addUser.save()

        const result = await userModel.findById(addUser._id)
        res.status(200).send({
            type:'success',
            msg:'Your account has been created Successfully',
            data:result
        })


    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:'Server Error',
            err:err
        })
    }
}

exports.logIn = async(req,res,next)=>{
    try{

        const {email,password} = req.body
        const singleUser = await userModel.findOne({email:email})
        

        bcrypt.compare(password, singleUser.password, function(err, result) {
            if(result){
                let token = jwt.sign({
                    email:singleUser.email,
                    firstName:singleUser.firstName,
                    lastName:singleUser.lastName
                },
                'secrate-key',
                {
                    expiresIn:'1h'
                }
                )

                return res.status(200).send({
                    type:'success',
                    msg:`${singleUser.firstName} Your are Successfully Loged In`,
                    token:token,
                    data:singleUser
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
        return res.status(500).send("Server Error")
    }
}