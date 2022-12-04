require('dotenv').config()
const express = require('express');
require('./db/db')
const cors  = require('cors')


const productRoute = require('./routes/product/productRoute')
const userRoute = require('./routes/user/userRoutes')
const app = express()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Welcome to our website')
})

app.use('/user',userRoute)
app.use('/products',productRoute)


const port = process.env.PORT || 400;

app.listen(port, console.log(`Server is running on Port ${port}`))