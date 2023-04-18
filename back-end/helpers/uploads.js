const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

let upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype =="image/jpg" ||
            file.mimetype =="image/jpeg"
        ){
            cb(null,true)
        }else{
            console.log("only image and jpg is supported")
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
    
})

module.exports = upload