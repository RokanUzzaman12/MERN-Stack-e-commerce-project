const categoryModal = require('../../models/category')
const slugify = require('slugify')

exports.createCategory = async(req,res,next)=>{
    try{

        const {name} = req.body
        const slug = slugify(name,{lower:true})
        let previousCategory = await categoryModal.findOne().sort({create:-1})
        let order = 0;
        if(previousCategory){
            order = previousCategory.order + 1
        }

        const addNewCategory = new categoryModal({
            name,
            slug,
            order
        })

        await addNewCategory.save()

        res.status(200).send({
            type:'success',
            msg:'Category added successfully',
            data:addNewCategory
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

exports.fetchAllCategory = async(req,res,next)=>{
    try{

        const result = await categoryModal.find().sort({create:-1})
        
        res.status(200).send({
            type:'success',
            msg:'Data fetched',
            data:result
        })
        
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}