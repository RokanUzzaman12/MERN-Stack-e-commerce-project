const permissionModel = require('../../models/permissionModel')

exports.addNewModal = (async(req,res,next)=>{
    try{
        const { subNavTitle, navId } = req.body
        const addNew = new permissionModel({
            subNavTitle
        })
        await addNew.save()
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