const menuModel = require('../../models/menuModel')

exports.addNewModal = (async(req,res,next)=>{
    try{

        const {title} = req.body
        let order = 0
        const previousOrder = await menuModel.findOne().sort({create:-1})

        if(previousOrder){
            order = previousOrder.order +1
        }

        let addNewMenu = new menuModel({
            title,
            order
        })

        await addNewMenu.save()
        
        return res.status(200).send({
            type:'success',
            data:addNewMenu
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})
