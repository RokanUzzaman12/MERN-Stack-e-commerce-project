require('dotenv').config()
const express = require('express');
const cors  = require('cors')
const productRoute = require('./routes/product/productRoute')
const app = express()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Welcome to our website')
})

app.use('/products',productRoute)
const port = process.env.PORT || 400;

app.listen(port, console.log(`Server is running on Port ${port}`))