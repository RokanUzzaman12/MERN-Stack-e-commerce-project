const mongoose = require('mongoose')
try{
    mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
        console.log("mongodb://localhost:27017/ecommerce is connected")
    })
}catch(err){
    console.log(err.response)
}
