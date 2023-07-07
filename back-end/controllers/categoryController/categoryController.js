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

exports.updateCategory = async(req,res,next)=>{
    try{
        let categoryId = req.params.Id

        const {name} = req.body
        const selectedCategoryData = await categoryModal.findOne({_id:categoryId})

        const slug = slugify(name,{lower:true})
        selectedCategoryData.name = name
        selectedCategoryData.slug = slug

        await selectedCategoryData.save()

        const result = await categoryModal.findOne({_id:categoryId})

        res.status(200).send({
            type:'success',
            msg:'Category Updated Successfully',
            data:result
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

exports.deleteCategory = async(req,res,next)=>{
    try{
        const categoryId = req.params.Id
        const selectedCategory = await categoryModal.findOne({_id:categoryId})
        await selectedCategory.remove()
        res.status(200).send({
            type:'success',
            msg:'Category deleted Successfully',
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}